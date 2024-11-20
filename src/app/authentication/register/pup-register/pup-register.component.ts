import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  imagePreview: string | null = null;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      // Step 1
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{8,}$')]],
      city: ['', Validators.required],
      address: ['', Validators.required],

      // Step 2
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
      this.currentStep++;
    }
  }

  onBack() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  onSubmit() {
    if (this.isStepValid(1)) {
        const formData = {
        personalInfo: {
          fullName: this.registerForm.get('fullName')?.value,
          email: this.registerForm.get('email')?.value,
          phoneNumber: this.registerForm.get('phoneNumber')?.value,
          city: this.registerForm.get('city')?.value,
          address: this.registerForm.get('address')?.value,
        },
        companyInfo: {
          companyEmail: this.registerForm.get('companyEmail')?.value,
          password: this.registerForm.get('password')?.value,
          confirmPassword: this.registerForm.get('confirmPassword')?.value,
          companyName: this.registerForm.get('companyName')?.value,
          companyPhoneNumber: this.registerForm.get('companyPhoneNumber')?.value,
          companyCity: this.registerForm.get('companyCity')?.value,
          companyAddress: this.registerForm.get('companyAddress')?.value,
          description: this.registerForm.get('description')?.value,
        },
      };
      console.log(formData);

      console.log('Form Submitted:', this.registerForm.value);
      this.router.navigate(['/email-confirmation-sent']);
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

  uploadImage() {
    // Placeholder for upload logic
    console.log('Upload Profile Picture button clicked');
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
