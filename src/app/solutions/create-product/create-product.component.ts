import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SimpleEventTypeDTO} from '../../shared/dto/eventTypes/SimpleEventTypeDTO.model';
import {MatDialogRef} from '../../infrastructure/material/material.module';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CategoryDTO} from '../../shared/dto/categories/categoryDTO.model';
import {ImageServiceService} from '../../shared/services/image-service.service';
import {forkJoin, Observable} from 'rxjs';
import {CreateProductDTO} from '../../shared/dto/solutions/createProductDTO.model';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {
  createProductForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
    basePrice: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    discount: new FormControl<number | null>(null, [Validators.required, Validators.max(100), Validators.min(0)]),
    category: new FormControl<string>('', [Validators.required]),
    eventType: new FormControl<string[]>([]),
    acceptance: new FormControl<string>('auto', [Validators.required]),
    available: new FormControl<boolean>(true, [Validators.required]),
    visible: new FormControl<boolean>(true, [Validators.required]),
    categoryName: new FormControl<string>(''),
  });

  filteredEventTypes: SimpleEventTypeDTO[];

  constructor(public dialogRef: MatDialogRef<CreateProductComponent>,
              @Inject(MAT_DIALOG_DATA) protected categories: CategoryDTO[],
              private imageService: ImageServiceService) {
    this.createProductForm.get('category')?.valueChanges.subscribe((categoryId: string) => {
      const category: CategoryDTO = this.categories.find(cat => cat.id === categoryId);
      this.filteredEventTypes = category?.eventTypes.filter(et => !et.deactivated)  || [];
    });
  }

  create(): void {
    const categoryControl = this.createProductForm.get('category');
    const categoryNameControl = this.createProductForm.get('categoryName');

    // Custom validation: Ensure either category or categoryName is filled
    if (!categoryControl?.value && !categoryNameControl?.value) {
      categoryControl?.setErrors({ required: true });
      categoryNameControl?.setErrors({ required: true });
      this.createProductForm.markAllAsTouched();
      return;
    }

    if(this.createProductForm.valid && this.imageUploads.length > 0) {

      // Upload all images
      const uploadObservables: Observable<string>[] = this.imageUploads.map((image: File): Observable<string> =>
        this.imageService.uploadImage(image)
      );

      //wait for all images to be uploaded
      forkJoin(uploadObservables).subscribe({
        next: (uploadedImages: string[]): void => {
          let productDTO: CreateProductDTO = {
            name: this.createProductForm.value.name,
            description: this.createProductForm.value.description,
            pictures: uploadedImages,
            basePrice: this.createProductForm.value.basePrice,
            discount: this.createProductForm.value.discount,
            finalPrice: this.createProductForm.value.basePrice * (this.createProductForm.value.discount / 100),
            categoryId: this.createProductForm.value.category,
            eventTypesIds: this.createProductForm.value.eventType,
            available: this.createProductForm.value.available,
            visible: this.createProductForm.value.visible,
          };
          if (this.createProductForm.value.categoryName) {
            productDTO.categoryId = this.createProductForm.value.categoryName;
          }
          this.dialogRef.close(productDTO);
        },
        error: (err: { error?: { message?: string } }) => {
          console.error('Error uploading images', err);
        }
      });
    } else {
      this.createProductForm.markAllAsTouched();
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
