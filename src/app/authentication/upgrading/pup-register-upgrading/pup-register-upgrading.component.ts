import {ChangeDetectorRef, Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegistrationService} from '../../services/registration/registration.service';
import {Router} from '@angular/router';
import {CreateLocationDTO} from '../../../shared/dto/locations/CreateLocationDTO.model';
import {User} from '../../../shared/model/user.model';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {DetailedServiceProviderDTO} from '../../../shared/dto/users/serviceProvider/DetailedServiceProviderDTO.model';
import {ProfileService} from '../../../profile/profile.service';
import {UserService} from '../../services/user.service';
import {forkJoin, Observable} from 'rxjs';
import {image} from 'html2canvas/dist/types/css/types/image';
import {environment} from '../../../../env/envirements';
import {ImageServiceService} from '../../../shared/services/image-service.service';

@Component({
  selector: 'app-pup-register-upgrading',
  templateUrl: './pup-register-upgrading.component.html',
  styleUrl: './pup-register-upgrading.component.css'
})
export class PupRegisterUpgradingComponent {

  user: User;
  upgradeForm: FormGroup;
  companyImages: { src: string, cropped: string }[] = []; // Multiple company images with cropped versions

  uploadedImages: File[] = []; // all to add
  imageUrls: string[] = []; // to preview and remove

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private profileService: ProfileService,
              private userService: UserService,
              private imageService: ImageServiceService,

              ) {

    this.user = this.userService.getUserData();
    this.upgradeForm = this.formBuilder.group({
      companyEmail: ['', [Validators.required, Validators.email]],
      companyName: ['', Validators.required],
      companyPhoneNumber: ['', Validators.required],
      companyCity: ['', Validators.required],
      companyAddress: ['', Validators.required],
      description: ['', Validators.required],
    });
  }


  onSubmit() {

    if (this.isFormValid()) {

      const uploadObservables: Observable<string>[]= this.uploadedImages
        .filter((image: File | null):boolean => image !== null)
        .map((image: File): Observable<string> => this.imageService.uploadImage(image))

      const imageNames: string[] = this.imageUrls
        .map(
          image =>
            image.includes(environment.apiImagesHost) ? image.replace(environment.apiImagesHost, '') : '')
        .filter(image => image !== '');


      forkJoin(uploadObservables).subscribe({
        next: (uploadedImages: string[]) : void => {

          const details: DetailedServiceProviderDTO = {
            companyEmail: this.upgradeForm.value.companyEmail,
            companyName: this.upgradeForm.value.companyName,
            companyPhoneNumber: this.upgradeForm.value.companyPhoneNumber,
            companyLocation: {
              address: this.upgradeForm.value.companyAddress,
              city: this.upgradeForm.value.companyCity,
            } as CreateLocationDTO,
            companyDescription: this.upgradeForm.value.description,
            companyPhotos: imageNames.concat(uploadedImages)
          };

          this.profileService.upgradeToPUP(details).subscribe(
            {
              next: result => {
                console.log(result);
                this.router.navigate(['/upgrade-confirmation']);
              },
              error: error => {
                console.log(error);
              }
            }
          );

        },
        error: error => {
          console.error("Error uploading images", error);
        }
      });

      if (uploadObservables.length === 0) {

        const details: DetailedServiceProviderDTO = {
          companyEmail: this.upgradeForm.value.companyEmail,
          companyName: this.upgradeForm.value.companyName,
          companyPhoneNumber: this.upgradeForm.value.companyPhoneNumber,
          companyLocation: {
            address: this.upgradeForm.value.companyAddress,
            city: this.upgradeForm.value.companyCity,
          } as CreateLocationDTO,
          companyDescription: this.upgradeForm.value.description,
          companyPhotos: null
        };

        this.profileService.upgradeToPUP(details).subscribe(
          {
            next: result => {
              console.log(result);
              this.router.navigate(['/upgrade-confirmation']);
            },
            error: error => {
              console.log(error);
            }
          }
        );
      }
    }
  }

  isFormValid() {

    const fields:string[] = [
        'companyEmail',
        'companyName',
        'companyPhoneNumber',
        'companyCity',
        'companyAddress',
        'description',
      ];

    fields.forEach((field) => this.upgradeForm.get(field)?.markAsTouched());
    return fields.every((field) => this.upgradeForm.get(field)?.valid);
  }


  onCompanyImageSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          this.companyImages.push({ src: e.target?.result as string, cropped: '' });
        };
        reader.readAsDataURL(files[i]);

        this.uploadedImages.push(files[i]);
        this.imageUrls.push(URL.createObjectURL(files[i]));
      }
    }
  }


  onCompanyImageCropped(event: ImageCroppedEvent, index: number) {
    this.companyImages[index].cropped = event.base64;
  }

  clearCompanyImage(index: number) {
    this.uploadedImages.splice(index, 1); // Remove the selected image
    this.imageUrls.splice(index, 1);
    this.companyImages.splice(index, 1); // Remove the selected image
  }

  triggerFileInput(step: number) {
    const inputElement = document.getElementById(step === 0 ? 'profilePic' : 'companyPictures') as HTMLInputElement;
    inputElement?.click();
  }

}
