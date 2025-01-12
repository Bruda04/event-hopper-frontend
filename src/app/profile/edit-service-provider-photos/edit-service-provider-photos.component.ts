import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {environment} from '../../../env/envirements';
import {forkJoin, Observable} from 'rxjs';
import {ImageServiceService} from '../../shared/services/image-service.service';
import {MatDialogRef} from '../../infrastructure/material/material.module';
import {UpdateServiceDTO} from '../../shared/dto/solutions/updateServiceDTO.model';

@Component({
  selector: 'app-edit-service-provider-photos',
  templateUrl: './edit-service-provider-photos.component.html',
  styleUrl: './edit-service-provider-photos.component.css'
})
export class EditServiceProviderPhotosComponent {

  constructor(public dialogRef: MatDialogRef<EditServiceProviderPhotosComponent>, @Inject(MAT_DIALOG_DATA) public companyImages: String[], private imageService: ImageServiceService) {
  }

  uploadedImages: File[] = []; // all to add
  imageUrls: string[] = []; // to preview and remove

  ngOnInit(){
    this.companyImages.forEach(picture => {
      this.imageUrls.push(environment.apiImagesHost+picture); // Add the image to the preview
      this.uploadedImages.push(null); // Add a null image to the list of images to upload to maintain the order
    });
  }

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


  update(): void {
    if(this.uploadedImages.length > 0) {
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
          this.dialogRef.close(imageNames.concat(uploadedImages));
        },
        error: (err ): void => {
          console.error("Error uploading images", err);
        }
      });

      // If there are no images to upload, close the dialog
      if (uploadObservables.length === 0) {
        this.dialogRef.close(imageNames);
      }

    } else {
      this.dialogRef.close([]);
    }
  }




}
