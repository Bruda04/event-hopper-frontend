import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('.*[A-Z].*'), Validators.pattern('.*[0-9].*')]],
      confirmPassword: ['', [Validators.required]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      surname: ['', Validators.required],
    });

    // Custom validator for password matching
    this.registerForm.get('confirmPassword')?.setValidators([Validators.required, this.passwordMatchValidator.bind(this)]);
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(control: any) {
    if (control.value !== this.registerForm?.get('password')?.value) {
      return { passwordMatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput() {
    // Trigger the file input click event programmatically when the "Upload" button is clicked
    const fileInput = document.getElementById('profilePic') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  uploadProfilePicture() {
    // Handle the file upload logic here (e.g., sending it to the server)
    console.log('Profile picture uploaded');
  }
}
