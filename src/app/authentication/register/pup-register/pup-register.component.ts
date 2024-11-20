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
  currentStep: number = 0; // Track which step/page is being displayed

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      // Step 1 Fields
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{8,}$')],
      ],
      address: ['', Validators.required],

      // Step 2 Fields
      city: ['', Validators.required],
      businessName: ['', Validators.required],
      businessCategory: ['', Validators.required],
      terms: [false, Validators.requiredTrue], // Checkbox for agreeing to terms
    });
  }

  // Accessors for step 1 and step 2 fields
  get step1Controls() {
    return {
      fullName: this.registerForm.get('fullName'),
      email: this.registerForm.get('email'),
      phoneNumber: this.registerForm.get('phoneNumber'),
      address: this.registerForm.get('address'),
    };
  }

  get step2Controls() {
    return {
      city: this.registerForm.get('city'),
      businessName: this.registerForm.get('businessName'),
      businessCategory: this.registerForm.get('businessCategory'),
      terms: this.registerForm.get('terms'),
    };
  }

  // Navigate to the next step, validating the current step first
  onNext() {
    if (this.currentStep === 0) {
      if (this.isStepValid(0)) {
        this.currentStep++;
      }
    }
  }

  // Navigate back to the previous step
  onBack() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  // Submit the form after final validation
  onSubmit() {
    if (this.isStepValid(1)) {
      console.log('Form Submitted:', this.registerForm.value);
      this.router.navigate(['/email-confirmation-sent']);
    }
  }

  // Validate fields for a specific step
  isStepValid(step: number): boolean {
    if (step === 0) {
      Object.values(this.step1Controls).forEach((control) =>
        control?.markAsTouched()
      );
      return (
        this.step1Controls.fullName?.valid &&
        this.step1Controls.email?.valid &&
        this.step1Controls.phoneNumber?.valid &&
        this.step1Controls.address?.valid
      );
    } else if (step === 1) {
      Object.values(this.step2Controls).forEach((control) =>
        control?.markAsTouched()
      );
      return (
        this.step2Controls.city?.valid &&
        this.step2Controls.businessName?.valid &&
        this.step2Controls.businessCategory?.valid &&
        this.step2Controls.terms?.valid
      );
    }
    return false;
  }
}
