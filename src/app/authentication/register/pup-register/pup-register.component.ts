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
import {ImageServiceService} from '../../../shared/services/image-service.service';
import {forkJoin, Observable} from 'rxjs';
import {environment} from '../../../../env/envirements';
import {UpdateServiceDTO} from '../../../shared/dto/solutions/updateServiceDTO.model';

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

  profileImageUpload: File;
  profileImageUrl: string = "";
  // Separate attributes for profile and company images
  imagePreview: string | null = null; // Profile image
  companyImages: { src: string, cropped: string }[] = []; // Multiple company images with cropped versions

  uploadedImages: File[] = []; // all to add
  imageUrls: string[] = []; // to preview and remove

  constructor(private fb: FormBuilder, private router: Router, private registrationService: RegistrationService, private imageService: ImageServiceService) {
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
      endTime: ['', Validators.required],
      startTime: ['', Validators.required],
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



  uploadProfilePictureAndAccount(createAccount: CreateServiceProviderAccountDTO){
    if(this.profileImageUpload != null) {
      this.imageService.uploadImage(this.profileImageUpload).subscribe({
        next: (url: string) => {
          createAccount.person.profilePicture = url;


          //this also sends an email - I don't want it to wait
          this.router.navigate(['/email-confirmation-sent']);
          this.registrationService.registerServiceProvider(createAccount).subscribe({
            next: (response) => {
              //this.router.navigate(['/email-confirmation-sent']);
            },
            error: (err) => {
              console.error('Error registering service provider:', err);
            },
          });
        },
        error: (err) => {
          console.error('Error uploading image:', err);
        },
      });
    }else{
      //this also sends an email - I don't want it to wait
      this.router.navigate(['/email-confirmation-sent']);
      this.registrationService.registerServiceProvider(createAccount).subscribe({
        next: (response) => {
          //this.router.navigate(['/email-confirmation-sent']);
        },
        error: (err) => {
          console.error('Error registering service provider:', err);
        },
      });
    }
  }


  onSubmit() {
    if (this.isStepValid(1)) {
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


      console.log(uploadObservables)
      console.log(imageNames)
      console.log(this.imageUrls)
      forkJoin(uploadObservables).subscribe({
        next: (uploadedImages: string[]): void => {
          const createServiceProviderDTO: CreateServiceProviderDTO = {
            name: this.registerForm.value.fullName.split(' ')[0], //first name
            surname: this.registerForm.value.fullName.split(' ').slice(1).join(' ') || '',
            profilePicture: "",
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
            companyPhotos: imageNames.concat(uploadedImages),
            workStart: this.registerForm.value.startTime,
            workEnd: this.registerForm.value.endTime
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
          this.uploadProfilePictureAndAccount(createAccount);

        },
        error: (err ): void => {
          console.log(imageNames);
          console.log(this.uploadedImages
            .filter((image: File | null): boolean => image !== null))
          console.error("Error uploading images", err);
        }
      });

      // If there are no images to upload
      if (uploadObservables.length === 0) {
        const createServiceProviderDTO: CreateServiceProviderDTO = {
          name: this.registerForm.value.fullName.split(' ')[0], //first name
          surname: this.registerForm.value.fullName.split(' ').slice(1).join(' ') || '',
          profilePicture: "",
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
          workStart: this.registerForm.value.startTime,
          workEnd: this.registerForm.value.endTime,
          companyPhotos: null
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
        this.uploadProfilePictureAndAccount(createAccount);
      }


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
        'endTime',
        'startTime',
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

    this.profileImageUpload = files[0];
    this.profileImageUrl = URL.createObjectURL(files[0]);
  }

  clearProfileImage() {
    this.profileImageUpload = null;
    this.profileImageUrl = '';
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

        this.uploadedImages.push(files[i]);
        this.imageUrls.push(URL.createObjectURL(files[i]));
      }
    }
  }

  // Cropping function for company images
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
