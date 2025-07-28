import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import {RegistrationService} from '../../services/registration/registration.service';
import {CreateEventOrganizerDTO} from '../../../shared/dto/users/eventOrganizer/CreateEventOrganizerDTO.model';
import {PersonType} from '../../../shared/model/PersonType.model';
import {CreateLocationDTO} from '../../../shared/dto/locations/CreateLocationDTO.model';
import {CreateEventOrganizerAccountDTO} from '../../../shared/dto/users/account/CreateEventOrganizerAccountDTO.model';
import {CreateRegistrationRequestDTO} from '../../../shared/dto/registrationRequest/CreateRegistrationRequestDTO.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../env/envirements';
import {ImageServiceService} from '../../../shared/services/image-service.service';

function phoneMinLengthValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value?.toString() || ''; // Convert the number to a string
  return value.length >= 8 ? null : { minlength: true };
}

export function fullNameValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value?.trim();
  if (!value) return null; // required validator handles empty case
  const parts = value.split(/\s+/); // splits by spaces
  return parts.length >= 2 ? null : { fullNameInvalid: true };
}

@Component({
  selector: 'app-organizer-register',
  templateUrl: './organizer-register.component.html',
  styleUrls: ['./organizer-register.component.css']
})
export class OrganizerRegisterComponent {
  registerForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  imagePreview: string | null = null;
  profileImageUpload: File;
  profileImageUrl: string = "";

  constructor(private fb: FormBuilder, private router: Router, private registrationService: RegistrationService, private http: HttpClient,
                private imageService: ImageServiceService) {
    this.registerForm = this.fb.group(
      {
        fullName: ['', [Validators.required, fullNameValidator]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern('.*[A-Z].*'),
            Validators.pattern('.*[0-9].*')
          ]
        ],
        confirmPassword: ['', Validators.required],
        phoneNumber: ['', [Validators.required, phoneMinLengthValidator, Validators.pattern('[0-9]*')]],
        address: ['', Validators.required],
        city: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator } // Add custom validator here
    );
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(group: FormGroup): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPasswordControl = group.get('confirmPassword');

    if (password !== confirmPasswordControl?.value) {
      confirmPasswordControl?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPasswordControl?.setErrors(null);
      return null;
    }
  }


  onSubmit() {
    if (this.registerForm.valid) {
      this.registrationService.isEmailTaken(this.registerForm.value.email).subscribe({
        next: (isTaken) => {
          if (isTaken) {
            this.registerForm.get('email')?.setErrors({ emailTaken: true });
            return;
          }


          const createEventOrganizerDTO: CreateEventOrganizerDTO = {
            name: this.registerForm.value.fullName.split(' ')[0], //first name
            surname: this.registerForm.value.fullName.split(' ').slice(1).join(' ') || '',
            profilePicture: "",
            phoneNumber: this.registerForm.value.phoneNumber,
            type: PersonType.EVENT_ORGANIZER,
            location: {
              address: this.registerForm.value.address,
              city: this.registerForm.value.city,
            } as CreateLocationDTO,
          };
          const createAccount: CreateEventOrganizerAccountDTO = {
            email: this.registerForm.value.email,
            password: this.registerForm.value.password,
            isVerified: false,
            suspensionTimeStamp: null,
            type: PersonType.EVENT_ORGANIZER,
            person: createEventOrganizerDTO,
            registrationRequest:{} as CreateRegistrationRequestDTO,
          }
          if(this.profileImageUpload != null) {
            this.imageService.uploadImage(this.profileImageUpload).subscribe({
              next: (url: string) => {
                createAccount.person.profilePicture = url;


                //this also sends an email - I don't want it to wait
                this.router.navigate(['/email-confirmation-sent']);
                this.registrationService.registerEventOrganizer(createAccount).subscribe({
                  next: (response) => {
                    //this.router.navigate(['/email-confirmation-sent']);
                  },
                  error: (err) => {
                    console.error('Error registering event organizer:', err);
                  },
                });
              },
              error: (err) => {
                console.error('Error uploading image:', err);
              },
            });

          }
          else{
            //this also sends an email - I don't want it to wait
            this.router.navigate(['/email-confirmation-sent']);
            this.registrationService.registerEventOrganizer(createAccount).subscribe({
              next: (response) => {
                //this.router.navigate(['/email-confirmation-sent']);
              },
              error: (err) => {
                console.error('Error registering event organizer:', err);
              },
            });
          }


        },
        error: (err) => {
          console.error('Error finding email', err);
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  onFileSelected(event: Event) {
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


  clearImage() {
    this.imagePreview = null;
    this.profileImageUpload = null;
    this.profileImageUrl = '';
  }

  triggerFileInput() {
    const fileInput = document.getElementById('profilePic') as HTMLInputElement;
    fileInput?.click();
  }
}
