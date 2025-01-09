import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {MatRadioChange} from '@angular/material/radio';
import {EventTypeManagementDTO} from '../../shared/dto/eventTypes/EventTypeManagementDTO.model';
import {EventTypesService} from '../../admin-dashboard/eventTypes/event-types.service';
import {EventService} from '../../event/event.service';
import {CreateEventDTO} from '../../shared/dto/events/CreateEventDTO.model';
import {CreateAgendaActivityDTO} from '../../shared/dto/events/CreateAgendaActivityDTO.model.';
import {CreateLocationDTO} from '../../shared/dto/locations/CreateLocationDTO.model';
import {EventPrivacyType} from '../../shared/model/EventPrivacyType.model';
import {ImageServiceService} from '../../shared/services/image-service.service';
import {SimpleEventTypeDTO} from '../../shared/dto/eventTypes/SimpleEventTypeDTO.model';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {
  eventForm: FormGroup;
  currentStep: number = 0;
  imagePreview: string | null = null;
  date: any;
  today: Date = new Date();
  privacy: string = 'public';
  allEventTypes: SimpleEventTypeDTO[] = [];
  allField : SimpleEventTypeDTO = {
    id: '',
    name: 'All',
    description: '',
    suggestedCategories: [],
    deactivated: false,
  };

  imageUpload: File;
  imageUrl: string;
  imageSubmitted: boolean = false;
  agendaForm: FormGroup;
  agendaActivities: any[] = [];

  constructor(private fb: FormBuilder, private router: Router, private eventTypesService: EventTypesService,
              private eventService: EventService, private imageService: ImageServiceService) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      numParticipants: ['', [Validators.required, Validators.min(1), Validators.max(100000), ]],
      description: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      date : ['', Validators.required],
      eventTypes: ['', Validators.required],
    });


    this.agendaForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      locationName: [''],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadEventTypes();
  }


  onNext() {
    if (this.currentStep === 0 && this.isStepValid(0)) {
      this.currentStep++;
    }
  }

  onBack() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  onSubmit() {
    if (this.isStepValid(1)) {
      let agenda : CreateAgendaActivityDTO[] = [];
      this.agendaActivities.forEach((activity) => {
        agenda.push({
          name: activity.name,
          description: activity.description,
          locationName: activity.locationName,
          startTime: activity.startTime,
          endTime: activity.endTime,
        });
      });

      const locationDTO: CreateLocationDTO = {
        city: this.eventForm.get('city')?.value,
        address: this.eventForm.get('address')?.value,
        latitude: 0,
        longitude: 0,
      }

      const eventPrivacy: EventPrivacyType = this.privacy === 'public' ? EventPrivacyType.PUBLIC : EventPrivacyType.PRIVATE;

      const createEventDTO: CreateEventDTO = {
        name: this.eventForm.get('title')?.value,
        maxAttendance: this.eventForm.get('numParticipants')?.value,
        description: this.eventForm.get('description')?.value,
        eventPrivacyType: eventPrivacy,
        time: this.eventForm.get('date')?.value,
        picture: '',
        eventTypeId: this.eventForm.get('eventTypes')?.value.id,
        agendaActivities: agenda,
        location: locationDTO,
      }

      this.imageService.uploadImage(this.imageUpload).subscribe({
        next: (url: string) => {
          createEventDTO.picture = url;


          console.log(createEventDTO);
          this.eventService.addEvent(createEventDTO).subscribe({
            next: () => {
              console.log('Event created');
              this.router.navigate(['/my-events']);
            },
            error: () => {
              console.error('Error creating event');
            }
          });
        },
        error: () => {
          console.error('Error uploading image');
        }
      })








    }
  }

  isStepValid(step: number): boolean {
    const fields = ['title', 'numParticipants', 'description', 'city', 'address', 'date', 'eventTypes'];
    if(!this.imageSubmitted){
      return false;
    }
    fields.forEach((field) => this.eventForm.get(field)?.markAsTouched());
    return fields.every((field) => this.eventForm.get(field)?.valid);
  }

  // Handle profile image upload (Step 1)
  onImageSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;

    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(files[0]);

      this.imageUpload = files[0];
      this.imageSubmitted = true;
      this.imageUrl = URL.createObjectURL((files[0]));
    }
  }

  clearImage() {
    this.imagePreview = null;
    this.imageSubmitted = false;
    this.imageUrl = '';
    this.imageUpload = null;
  }

  triggerFileInput(step: number) {
    const inputElement = document.getElementById('profilePic') as HTMLInputElement;
    inputElement?.click();
  }

  OnDateChange(event: MatDatepickerInputEvent<any, any>){
    this.date = event.value;
    this.eventForm.get('date')?.setValue(event.value);
  }

  eventRadioChange(event: MatRadioChange) {
    this.privacy = event.value;
  }

  private loadEventTypes(): void {
    this.eventTypesService.getEventTypesForManagement().subscribe({
      next: (eventTypesDTOs: EventTypeManagementDTO) => {
        eventTypesDTOs.eventTypes.forEach((eventType) => {
          if(!eventType.deactivated){
            this.allEventTypes.push(eventType);
          }
        });
        //place it at the top
        this.allEventTypes.unshift(this.allField);
      },
      error: (_) => {
        console.error("Error loading event types");
      }
    });
  }







  //Agenda-----------------------------
  addActivity() {
    const activity = this.agendaForm.value;

    // Convert times to minutes for comparison
    const startMinutes = this.convertTimeToMinutes(activity.startTime);
    const endMinutes = this.convertTimeToMinutes(activity.endTime);


    if (startMinutes >= endMinutes) {
      this.agendaForm.get('endTime')?.setErrors({ invalidTimeRange: true });
      return;
    } else {
      this.agendaForm.get('endTime')?.setErrors(null); // Clear custom error if valid
    }


    // Validate time overlap
    const isOverlapping = this.agendaActivities.some((existing) => {
      const existingStart = this.convertTimeToMinutes(existing.startTime);
      const existingEnd = this.convertTimeToMinutes(existing.endTime);

      return (
        (startMinutes >= existingStart && startMinutes < existingEnd) ||
        (endMinutes > existingStart && endMinutes <= existingEnd) ||
        (startMinutes <= existingStart && endMinutes >= existingEnd)
      );
    });

    if (isOverlapping) {
      this.agendaForm.get('endTime')?.setErrors({ overlappingTime: true });
      return;
    } else {
      this.agendaForm.get('endTime')?.setErrors(null); // Clear custom error if valid
    }

    this.agendaActivities.push(activity);
    this.agendaActivities.sort((a, b) =>
      this.convertTimeToMinutes(a.startTime) - this.convertTimeToMinutes(b.startTime)
    );
    this.agendaForm.reset();
  }

  removeActivity(index: number) {
    this.agendaActivities.splice(index, 1);
  }

  private convertTimeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }



}
