import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import {RegistrationService} from '../../services/registration/registration.service';
import {PersonType} from '../../model/person/PersonType.model';
import {CreateEventOrganizerDTO} from '../../model/eventOrganizer/CreateEventOrganizerDTO.model';
import {CreateLocationDTO} from '../../model/location/CreateLocationDTO.model';
import {CreateRegistrationRequestDTO} from '../../model/registrationRequest/CreateRegistrationRequestDTO.model';
import {CreateEventOrganizerAccountDTO} from '../../model/account/CreateEventOrganizerAccountDTO.model';

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

  constructor(private fb: FormBuilder, private router: Router, private registrationService: RegistrationService) {
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

      const createEventOrganizerDTO: CreateEventOrganizerDTO = {
        name: this.registerForm.value.fullName.split(' ')[0], //first name
        surname: this.registerForm.value.fullName.split(' ').slice(1).join(' ') || '',
        profilePicture: "",//this.registerForm.value.profileImage, // Image file
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

      console.log('Account Submitted:',createAccount);

      this.registrationService.registerEventOrganizer(createAccount).subscribe({
        next: (response) => {
          console.log('Event organizer registered successfully:', response);
          this.router.navigate(['/email-confirmation-sent']);
        },
        error: (err) => {
          console.error('Error registering event organizer:', err);
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
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imagePreview = e.target?.result as string; // Update preview
        this.registerForm.patchValue({ profileImage: file }); // Update form control
        this.registerForm.get('profileImage')?.updateValueAndValidity(); // Sync validity
      };
      reader.readAsDataURL(file);
    }
  }

  clearImage() {
    this.imagePreview = null; // Clear preview
    this.registerForm.patchValue({ profileImage: null }); // Clear form control value
    this.registerForm.get('profileImage')?.updateValueAndValidity(); // Sync validity
  }

  triggerFileInput() {
    const fileInput = document.getElementById('profilePic') as HTMLInputElement;
    fileInput?.click();
  }
}
