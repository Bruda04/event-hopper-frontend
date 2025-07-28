import {Component, Inject, Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '../../infrastructure/material/material.module';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SimpleEventTypeDTO} from '../../shared/dto/eventTypes/SimpleEventTypeDTO.model';
import {CategoryDTO} from '../../shared/dto/categories/categoryDTO.model';
import {CreateServiceDTO} from '../../shared/dto/solutions/createServiceDTO.model';
import {ImageServiceService} from '../../shared/services/image-service.service';
import {forkJoin, Observable} from 'rxjs';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrl: './create-service.component.css'
})
export class CreateServiceComponent {

  createServiceForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
    basePrice: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    discount: new FormControl<number | null>(null, [Validators.required, Validators.max(100), Validators.min(0)]),
    category: new FormControl<string>('', [Validators.required]),
    eventType: new FormControl<string[]>([]),
    acceptance: new FormControl<string>('auto', [Validators.required]),
    available: new FormControl<boolean>(true, [Validators.required]),
    visible: new FormControl<boolean>(true, [Validators.required]),
    duration: new FormControl<number | null>(null, [Validators.required, Validators.max(1440), Validators.min(0)]),
    reservationWindow: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    cancellationWindow: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    categoryName: new FormControl<string>(''),
  });

  filteredEventTypes: SimpleEventTypeDTO[];

  constructor(public dialogRef: MatDialogRef<CreateServiceComponent>,
              @Inject(MAT_DIALOG_DATA) protected categories: CategoryDTO[],
              private imageService: ImageServiceService) {
    this.createServiceForm.get('category')?.valueChanges.subscribe((categoryId: string) => {
      const category: CategoryDTO = this.categories.find(cat => cat.id === categoryId);
      this.filteredEventTypes = category?.eventTypes.filter(et => !et.deactivated)  || [];
    });
  }

  create(): void {
    const categoryControl = this.createServiceForm.get('category');
    const categoryNameControl = this.createServiceForm.get('categoryName');

    // Custom validation: Ensure either category or categoryName is filled
    if (!categoryControl?.value && !categoryNameControl?.value) {
      categoryControl?.setErrors({ required: true });
      categoryNameControl?.setErrors({ required: true });
      this.createServiceForm.markAllAsTouched();
      return;
    }

    if(this.createServiceForm.valid && this.imageUploads.length > 0) {

      // Upload all images
      const uploadObservables: Observable<string>[] = this.imageUploads.map((image: File): Observable<string> =>
        this.imageService.uploadImage(image)
      );

      //wait for all images to be uploaded
      forkJoin(uploadObservables).subscribe({
        next: (uploadedImages: string[]): void => {
          let service: CreateServiceDTO = {
            name: this.createServiceForm.value.name,
            description: this.createServiceForm.value.description,
            pictures: uploadedImages,
            basePrice: this.createServiceForm.value.basePrice,
            discount: this.createServiceForm.value.discount,
            finalPrice: this.createServiceForm.value.basePrice * (this.createServiceForm.value.discount / 100),
            categoryId: this.createServiceForm.value.category,
            eventTypesIds: this.createServiceForm.value.eventType,
            autoAccept: this.createServiceForm.value.acceptance === 'auto',
            available: this.createServiceForm.value.available,
            visible: this.createServiceForm.value.visible,
            durationMinutes: this.createServiceForm.value.duration,
            reservationWindowDays: this.createServiceForm.value.reservationWindow,
            cancellationWindowDays: this.createServiceForm.value.cancellationWindow,
          };
          if (this.createServiceForm.value.categoryName) {
            service.categoryId = this.createServiceForm.value.categoryName;
          }
          this.dialogRef.close(service);
        },
        error: (err: { error?: { message?: string } }) => {
          console.error('Error uploading images', err);
        }
      });
    } else {
      this.createServiceForm.markAllAsTouched();
    }
  }

  imageUploads: File[] = [];
  imageUrls: string[] = [];


  clearServiceImage(index: number): void {
    this.imageUploads.splice(index, 1); // Remove the selected image
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
        this.imageUploads.push(files[i]);
        this.imageUrls.push(URL.createObjectURL(files[i]));
      }
    }
  }

}
