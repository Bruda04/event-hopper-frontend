import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractControl, ValidationErrors } from '@angular/forms';

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
  formSubmitted = false; // Track if form submission should proceed

  constructor(private fb: FormBuilder, private router: Router) {
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
        phoneNumber: ['', [Validators.required, this.phoneMinLengthValidator, Validators.pattern('[0-9]*')]],
        address: ['', Validators.required],
        city: ['', Validators.required],
        profileImage: [null], // Ensure this is optional
      },
      { validators: this.passwordMatchValidator }
    );

  }

  // Custom validator for password match
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

  phoneMinLengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value?.toString() || '';
    return value.length >= 8 ? null : { minlength: true };
  }

  onSubmit() {
    console.log('Form Validity:', this.registerForm.valid);
    console.log('Form Values:', this.registerForm.value);

    if (this.registerForm.valid) {
      console.log('Form Submitted Successfully');
      this.router.navigate(['/email-confirmation-sent']);
    } else {
      this.registerForm.markAllAsTouched();
      console.error('Form is invalid:', this.registerForm.errors);
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
    this.formSubmitted = true; // Prevent form auto-switching during image upload
    const fileInput = document.getElementById('profilePic') as HTMLInputElement;
    fileInput?.click();
  }

}
