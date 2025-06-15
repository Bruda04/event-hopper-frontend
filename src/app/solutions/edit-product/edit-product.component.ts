import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SimpleEventTypeDTO} from '../../shared/dto/eventTypes/SimpleEventTypeDTO.model';
import {MatDialogRef} from '../../infrastructure/material/material.module';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {forkJoin, Observable} from 'rxjs';
import {environment} from '../../../env/envirements';
import {ProductForManagementDTO} from '../../shared/dto/solutions/productForManagementDTO.model';
import {ImageServiceService} from '../../shared/services/image-service.service';
import {UpdateProductDTO} from '../../shared/dto/solutions/updateProductDTO.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {

  editProductForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
    available: new FormControl<boolean>(true, [Validators.required]),
    visible: new FormControl<boolean>(true, [Validators.required]),
    eventTypes: new FormControl<string[]>([], [Validators.required]),
  });

  eventTypes: SimpleEventTypeDTO[];
  productToEdit: ProductForManagementDTO;

  constructor(public dialogRef: MatDialogRef<EditProductComponent>,
              @Inject(MAT_DIALOG_DATA) data: { productToEdit: ProductForManagementDTO, eventTypes: SimpleEventTypeDTO[] },
              private imageProduct: ImageServiceService
  ) {
    this.productToEdit = data.productToEdit;
    this.eventTypes = data.eventTypes;
    if (!this.eventTypes) {
      this.eventTypes = this.productToEdit.eventTypes;

    }
  }

  update(): void {
    if(this.editProductForm.valid && this.uploadedImages.length > 0) {
      // Upload all images
      const uploadObservables: Observable<string>[] = this.uploadedImages
        .filter((image: File | null): boolean => image !== null)
        .map((image: File): Observable<string> => this.imageProduct.uploadImage(image));

      // Extract the image names from the URLs
      const imageNames: string[] = this.imageUrls
        .map(
          image =>
            image.includes(environment.apiImagesHost) ? image.replace(environment.apiImagesHost, '') : '')
        .filter(image => image !== '');


      forkJoin(uploadObservables).subscribe({
        next: (uploadedImages: string[]): void => {
          const Product :UpdateProductDTO = {
            name: this.editProductForm.value.name,
            description: this.editProductForm.value.description,
            available: this.editProductForm.value.available,
            visible: this.editProductForm.value.visible,
            pictures: imageNames.concat(uploadedImages),
            eventTypesIds: this.editProductForm.value.eventTypes,
          };

          this.dialogRef.close(Product);
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
        const Product :UpdateProductDTO = {
          name: this.editProductForm.value.name,
          description: this.editProductForm.value.description,
          available: this.editProductForm.value.available,
          visible: this.editProductForm.value.visible,
          pictures: imageNames,
          eventTypesIds: this.editProductForm.value.eventTypes,
        };
        
        if(this.eventTypes.length == 0){
          Product.eventTypesIds = [];
        }

        this.dialogRef.close(Product);
      }

    } else {
      this.editProductForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    const productToEdit = {
      ...this.productToEdit,
      eventTypes: this.productToEdit.eventTypes.map(eventType => eventType.id)
    };
    this.editProductForm.patchValue(productToEdit);
    if (!this.eventTypes || this.eventTypes.length === 0) {
      this.editProductForm.get('eventTypes').disable();
    }

    productToEdit.pictures.forEach(picture => {
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

  onProductImageSelected(event: Event): void {
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
