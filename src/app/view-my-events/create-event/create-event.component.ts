import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {
  eventForm: FormGroup;
  currentStep: number = 0;
  imagePreview: string | null = null;




  constructor(private fb: FormBuilder, private router: Router) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      numParticipants: ['', [Validators.required, Validators.min(1), Validators.max(100000), ]],
      description: ['', Validators.required],
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
    });
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
      //this also sends an email so i don't want it to wait
      this.router.navigate(['/email-confirmation-sent']);
    }
  }

  isStepValid(step: number): boolean {
    const fields = step === 0
      ? ['title', 'email', 'phoneNumber', 'city', 'address']
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

    fields.forEach((field) => this.eventForm.get(field)?.markAsTouched());
    return fields.every((field) => this.eventForm.get(field)?.valid);
  }

  // Handle profile image upload (Step 1)
  onImageSelected(event: Event) {
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

  clearImage() {
    this.imagePreview = null;
  }



  triggerFileInput(step: number) {
    const inputElement = document.getElementById('profilePic') as HTMLInputElement;
    inputElement?.click();
  }














}
