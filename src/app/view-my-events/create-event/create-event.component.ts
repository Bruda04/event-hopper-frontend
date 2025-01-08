import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {MatRadioChange} from '@angular/material/radio';
import {SimpleEventTypeDTO} from '../../shared/dto/eventTypes/SimpleEventTypeDTO.model';
import {EventTypeManagementDTO} from '../../shared/dto/eventTypes/EventTypeManagementDTO.model';
import {EventTypesService} from '../../admin-dashboard/eventTypes/event-types.service';

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
    suggestedCategories: []
  };


  constructor(private fb: FormBuilder, private router: Router, private eventTypesService: EventTypesService) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      numParticipants: ['', [Validators.required, Validators.min(1), Validators.max(100000), ]],
      description: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{8,}$')]],
      city: ['', Validators.required],
      address: ['', Validators.required],
      date : ['', Validators.required],
      eventTypes: [[this.allField], Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadEventTypes();
  }


  onNext() {
    console.log(this.isStepValid(0))
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
      //this also sends an email so i don't want it to wait
      this.router.navigate(['/email-confirmation-sent']);
    }
  }

  isStepValid(step: number): boolean {
    const fields = step === 0
      ? ['title', 'numParticipants', 'description', 'city', 'address']
      : [
        'companyEmail',
        'password',
        'confirmPassword',
        'companyName',
        'companyPhoneNumber',
        'companyCity',
        'companyAddress',
        'description',
      ];
    console.log(this.eventForm)
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
    }
  }

  clearImage() {
    this.imagePreview = null;
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
      next: (eventTypesForManagement: EventTypeManagementDTO) => {

        this.allEventTypes = eventTypesForManagement.eventTypes;
        //place it at the top
        this.allEventTypes.unshift(this.allField);

      },
      error: (_) => {
        console.error("Error loading event types");
      }
    });
  }




}
