import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractControl, ValidationErrors } from '@angular/forms';

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
        phoneNumber: ['', [Validators.required, phoneMinLengthValidator, Validators.pattern('[0-9]*')]],
        address: ['', Validators.required],
        city: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator } // Add custom validator here
    );
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form Submitted:', this.registerForm.value);
      this.router.navigate(['/email-confirmation-sent']);
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
    const file = inputElement.files?.[0]; // Use optional chaining to safely access the file
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imagePreview = e.target?.result as string; // Cast result as string since it's a Data URL
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput() {
    const fileInput = document.getElementById('profilePic') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }
}
