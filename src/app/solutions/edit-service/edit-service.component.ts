import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '../../infrastructure/material/material.module';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ServiceManagementDTO} from '../../shared/dto/solutions/serviceManagementDTO.model';
import {SimpleEventTypeDTO} from '../../shared/dto/eventTypes/simpleEventTypeDTO.model';
import {UpdateServiceDTO} from '../../shared/dto/solutions/updateServiceDTO.model';
import {ImageServiceService} from '../../shared/services/image-service.service';
import {environment} from '../../../env/envirements';
import {forkJoin, Observable} from 'rxjs';


@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrl: './edit-service.component.css'
})
export class EditServiceComponent implements OnInit {

  editServiceForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
    acceptance: new FormControl<string>('auto', [Validators.required]),
    available: new FormControl<boolean>(true, [Validators.required]),
    visible: new FormControl<boolean>(true, [Validators.required]),
    durationMinutes: new FormControl<number | null>(null, [Validators.required, Validators.max(1440), Validators.min(0)]),
    reservationWindowDays: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    cancellationWindowDays: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    eventTypes: new FormControl<string[]>([], [Validators.required]),
  });

  eventTypes: SimpleEventTypeDTO[];
  serviceToEdit: ServiceManagementDTO;

  constructor(public dialogRef: MatDialogRef<EditServiceComponent>,
              @Inject(MAT_DIALOG_DATA) data: { serviceToEdit: ServiceManagementDTO, eventTypes: SimpleEventTypeDTO[] },
              private imageService: ImageServiceService
  ) {
    this.serviceToEdit = data.serviceToEdit;
    this.eventTypes = data.eventTypes;
    if (!this.eventTypes) {
      this.eventTypes = this.serviceToEdit.eventTypes;

    }
  }

  update(): void {
    if(this.editServiceForm.valid && this.uploadedImages.length > 0) {
      // Upload all images
      const uploadObservables: Observable<string>[] = this.uploadedImages
        .filter((image: File | null): boolean => image !== null)
        .map((image: File): Observable<string> => this.imageService.uploadImage(image));

      // Extract the image names from the URLs
      const imageNames: string[] = this.imageUrls
        .map(
          image =>
            image.includes(environment.apiImagesHost) ? image.replace(environment.apiImagesHost, '') : '')
        .filter(image => image !== '');


      forkJoin(uploadObservables).subscribe({
        next: (uploadedImages: string[]): void => {
          const service :UpdateServiceDTO = {
            name: this.editServiceForm.value.name,
            description: this.editServiceForm.value.description,
            autoAccept: this.editServiceForm.value.acceptance === 'auto',
            available: this.editServiceForm.value.available,
            visible: this.editServiceForm.value.visible,
            durationMinutes: this.editServiceForm.value.durationMinutes,
            reservationWindowDays: this.editServiceForm.value.reservationWindowDays,
            cancellationWindowDays: this.editServiceForm.value.cancellationWindowDays,
            pictures: imageNames.concat(uploadedImages),
            eventTypesIds: this.editServiceForm.value.eventTypes,
          };

          this.dialogRef.close(service);
        },
        error: (err ): void => {
          console.log(imageNames);
          console.log(this.uploadedImages
            .filter((image: File | null): boolean => image !== null))
          console.error("Error uploading images", err);
        }
      });

      // If there are no images to upload, close the dialog
      if (uploadObservables.length === 0) {
        const service :UpdateServiceDTO = {
          name: this.editServiceForm.value.name,
          description: this.editServiceForm.value.description,
          autoAccept: this.editServiceForm.value.acceptance === 'auto',
          available: this.editServiceForm.value.available,
          visible: this.editServiceForm.value.visible,
          durationMinutes: this.editServiceForm.value.durationMinutes,
          reservationWindowDays: this.editServiceForm.value.reservationWindowDays,
          cancellationWindowDays: this.editServiceForm.value.cancellationWindowDays,
          pictures: imageNames,
          eventTypesIds: this.editServiceForm.value.eventTypes,
        };

        this.dialogRef.close(service);
      }

    } else {
      this.editServiceForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    const serviceToEdit = {
      ...this.serviceToEdit,
      eventTypes: this.serviceToEdit.eventTypes.map(eventType => eventType.id)
    };
    this.editServiceForm.patchValue(serviceToEdit);
    if (!this.eventTypes) {
      this.editServiceForm.get('eventTypes').disable();
    }

    serviceToEdit.pictures.forEach(picture => {
      this.imageUrls.push(environment.apiImagesHost+picture); // Add the image to the preview
      this.uploadedImages.push(null); // Add a null image to the list of images to upload to maintain the order
    });

  }

  uploadedImages: File[] = []; // all to add
  imageUrls: string[] = []; // to preview and remove


  clearCompanyImage(index: number): void {
    this.uploadedImages.splice(index, 1); // Remove the selected image
    this.imageUrls.splice(index, 1);
  }

  triggerFileInput(): void {
    const inputElement = document.getElementById('companyPictures') as HTMLInputElement;
    inputElement?.click();
  }

  onServiceImageSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const files: FileList = inputElement.files;

    if (files) {
      for (let i: number = 0; i < files.length; i++) {
        this.uploadedImages.push(files[i]);
        this.imageUrls.push(URL.createObjectURL(files[i]));
      }
    }
  }


}
