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

function phoneMinLengthValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value?.toString() || ''; // Convert the number to a string
  return value.length >= 8 ? null : { minlength: true };
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
  profilePhoto: string | null = null;

  constructor(private fb: FormBuilder, private router: Router, private registrationService: RegistrationService, private http: HttpClient) {
    this.registerForm = this.fb.group(
      {
        fullName: ['', Validators.required],
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
        profileImage: [null],
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
            profilePicture: this.registerForm.value.profileImage, // Image file
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

          //this also sends an email so i dont want it to wait
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
          console.error('Error finding email', err);
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
      console.log('Form is invalid:', this.registerForm.value);
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      this.http.post<{ fileName: string }>(`${environment.apiHost}/images`, formData).subscribe({
        next: (response) => {
          this.profilePhoto = response.fileName; // Store the file name
          this.imagePreview = URL.createObjectURL(file); // Show the preview
          console.log('Image uploaded successfully:', response.fileName);
        },
        error: (error) => {
          console.error('Image upload failed:', error);
        },
      });
    }
  }


  clearImage() {
    this.imagePreview = null;
    this.profilePhoto = null;
    this.registerForm.patchValue({ profileImage: null }); // Clear form control value
    this.registerForm.get('profileImage')?.updateValueAndValidity(); // Sync validity
  }

  triggerFileInput() {
    const fileInput = document.getElementById('profilePic') as HTMLInputElement;
    fileInput?.click();
  }
}
