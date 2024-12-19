import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegistrationService} from '../../services/registration/registration.service';
import {Router} from '@angular/router';
import {CreateServiceProviderDTO} from '../../../shared/dto/users/serviceProvider/CreateServiceProviderDTO.model';
import {PersonType} from '../../../shared/model/PersonType.model';
import {CreateLocationDTO} from '../../../shared/dto/locations/CreateLocationDTO.model';
import {CreateServiceProviderAccountDTO} from '../../../shared/dto/users/account/CreateServiceProviderAccountDTO.model';
import {CreateRegistrationRequestDTO} from '../../../shared/dto/registrationRequest/CreateRegistrationRequestDTO.model';
import {User} from '../../../shared/model/user.model';
import {ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-pup-register-upgrading',
  templateUrl: './pup-register-upgrading.component.html',
  styleUrl: './pup-register-upgrading.component.css'
})
export class PupRegisterUpgradingComponent {

  user: User;
  upgradeForm: FormGroup;
  imagePreview: string | null = null; // Profile image
  companyImages: { src: string, cropped: string }[] = []; // Multiple company images with cropped versions

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private registrationService: RegistrationService,) {

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
    // if (this.isFormValid()) {
    //   const createServiceProviderDTO: CreateServiceProviderDTO = {
    //     type: PersonType.SERVICE_PROVIDER,
    //     location: {
    //       address: this.registerForm.value.address,
    //       city: this.registerForm.value.city,
    //     } as CreateLocationDTO,
    //
    //     companyEmail: this.registerForm.value.companyEmail,
    //     companyName: this.registerForm.value.companyName,
    //     companyPhoneNumber: this.registerForm.value.companyPhoneNumber,
    //     companyLocation: {
    //       address: this.registerForm.value.companyAddress,
    //       city: this.registerForm.value.companyCity,
    //     } as CreateLocationDTO,
    //     companyDescription: this.registerForm.value.description,
    //     companyPhotos: [""]
    //   };
    //
    //   const createAccount: CreateServiceProviderAccountDTO = {
    //     email: this.registerForm.value.email,
    //     password: this.registerForm.value.password,
    //     isVerified: false,
    //     suspensionTimeStamp: null,
    //     type: PersonType.SERVICE_PROVIDER,
    //     person: createServiceProviderDTO,
    //     registrationRequest:{} as CreateRegistrationRequestDTO,
    //   }
    //
    //   console.log('Account Submitted:', createAccount);
    //
    //   this.registrationService.registerServiceProvider(createAccount).subscribe({
    //     next: (response) => {
    //       console.log('Service provider registered successfully:', response);
    //       this.router.navigate(['/email-confirmation-sent']);
    //     },
    //     error: (err) => {
    //       console.error('Error registering service provider:', err);
    //     },
    //   });
    // }
  }


  onProfileImageSelected(event: Event) {
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

  clearProfileImage() {
    this.imagePreview = null;
  }

  // Handle company images upload (Step 2)
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
      }
    }
  }

  // Cropping function for company images
  onCompanyImageCropped(event: ImageCroppedEvent, index: number) {
    this.companyImages[index].cropped = event.base64;
  }

  clearCompanyImage(index: number) {
    this.companyImages.splice(index, 1); // Remove the selected image
  }

  triggerFileInput(step: number) {
    const inputElement = document.getElementById(step === 0 ? 'profilePic' : 'companyPictures') as HTMLInputElement;
    inputElement?.click();
  }

}
