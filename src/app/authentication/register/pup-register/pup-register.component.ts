import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import {RegistrationService} from '../../services/registration/registration.service';
import {CreateServiceProviderDTO} from '../../../shared/dto/users/serviceProvider/CreateServiceProviderDTO.model';
import {PersonType} from '../../../shared/model/PersonType.model';
import {CreateLocationDTO} from '../../../shared/dto/locations/CreateLocationDTO.model';
import {CreateServiceProviderAccountDTO} from '../../../shared/dto/users/account/CreateServiceProviderAccountDTO.model';
import {CreateRegistrationRequestDTO} from '../../../shared/dto/registrationRequest/CreateRegistrationRequestDTO.model';

@Component({
  selector: 'app-pup-register',
  templateUrl: './pup-register.component.html',
  styleUrls: ['./pup-register.component.css'],
})
export class PupRegisterComponent {
  registerForm: FormGroup;
  currentStep: number = 0;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  // Separate attributes for profile and company images
  imagePreview: string | null = null; // Profile image
  companyImages: { src: string, cropped: string }[] = []; // Multiple company images with cropped versions

  constructor(private fb: FormBuilder, private router: Router, private registrationService: RegistrationService) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{8,}$')]],
      city: ['', Validators.required],
      address: ['', Validators.required],
      companyEmail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      companyName: ['', Validators.required],
      companyPhoneNumber: ['', Validators.required],
      companyCity: ['', Validators.required],
      companyAddress: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  onNext() {
    if (this.currentStep === 0 && this.isStepValid(0)) {
      this.registrationService.isEmailTaken(this.registerForm.value.email).subscribe({
        next: (isTaken) => {
          if (isTaken) {
            this.registerForm.get('email')?.setErrors({ emailTaken: true });
            return;
          }else{
            this.currentStep++;
          }
        },
        error: (err) => {
          console.error('Error finding email', err);
        },
      });

    }
  }

  onBack() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  onSubmit() {
    if (this.isStepValid(1)) {
      const createServiceProviderDTO: CreateServiceProviderDTO = {
        name: this.registerForm.value.fullName.split(' ')[0], //first name
        surname: this.registerForm.value.fullName.split(' ').slice(1).join(' ') || '',
        profilePicture: "",//this.registerForm.value.profileImage, // Image file
        phoneNumber: this.registerForm.value.phoneNumber,
        type: PersonType.SERVICE_PROVIDER,
        location: {
          address: this.registerForm.value.address,
          city: this.registerForm.value.city,
        } as CreateLocationDTO,

        companyEmail: this.registerForm.value.companyEmail,
        companyName: this.registerForm.value.companyName,
        companyPhoneNumber: this.registerForm.value.companyPhoneNumber,
        companyLocation: {
          address: this.registerForm.value.companyAddress,
          city: this.registerForm.value.companyCity,
        } as CreateLocationDTO,
        companyDescription: this.registerForm.value.description,
        companyPhotos: [""]
      };

      const createAccount: CreateServiceProviderAccountDTO = {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        isVerified: false,
        suspensionTimeStamp: null,
        type: PersonType.SERVICE_PROVIDER,
        person: createServiceProviderDTO,
        registrationRequest:{} as CreateRegistrationRequestDTO,
      }


      this.registrationService.registerServiceProvider(createAccount).subscribe({
        next: (response) => {
          this.router.navigate(['/email-confirmation-sent']);
        },
        error: (err) => {
          console.error('Error registering service provider:', err);
        },
      });
    }
  }

  isStepValid(step: number): boolean {
    const fields = step === 0
      ? ['fullName', 'email', 'phoneNumber', 'city', 'address']
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

    fields.forEach((field) => this.registerForm.get(field)?.markAsTouched());
    return fields.every((field) => this.registerForm.get(field)?.valid);
  }

  // Handle profile image upload (Step 1)
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
