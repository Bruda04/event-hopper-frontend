import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { OrganizerRegisterComponent } from './organizer-register.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material moduli koje koristiš u šablonu
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

import { RegistrationService } from '../../services/registration/registration.service';
import { of, throwError } from 'rxjs';
import {ImageServiceService} from '../../../shared/services/image-service.service';

describe('OrganizerRegisterComponent', () => {
  let component: OrganizerRegisterComponent;
  let fixture: ComponentFixture<OrganizerRegisterComponent>;
  let registrationService: RegistrationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizerRegisterComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatCardModule,
      ],
      providers: [RegistrationService],
    }).compileComponents();

    fixture = TestBed.createComponent(OrganizerRegisterComponent);
    component = fixture.componentInstance;
    registrationService = TestBed.inject(RegistrationService);
    fixture.detectChanges();
  });

  it('should create the OrganizerRegisterComponent', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.registerForm.valid).toBeFalse();
  });

  describe('fullName validation', () => {
    it('should be invalid when empty', () => {
      const fullName = component.registerForm.controls['fullName'];
      fullName.setValue('');
      expect(fullName.hasError('required')).toBeTrue();
    });

    it('should be invalid when only one name part is provided', () => {
      const fullName = component.registerForm.controls['fullName'];
      fullName.setValue('John');
      expect(fullName.hasError('fullNameInvalid')).toBeTrue();
    });

    it('should be valid with at least two names', () => {
      const fullName = component.registerForm.controls['fullName'];
      fullName.setValue('John Doe');
      expect(fullName.valid).toBeTrue();
    });
  });

  describe('email validation', () => {
    it('should be invalid when empty', () => {
      const email = component.registerForm.controls['email'];
      email.setValue('');
      expect(email.hasError('required')).toBeTrue();
    });

    it('should be invalid when format is wrong', () => {
      const email = component.registerForm.controls['email'];
      email.setValue('invalid-email');
      expect(email.hasError('email')).toBeTrue();
    });

    it('should be valid with proper email', () => {
      const email = component.registerForm.controls['email'];
      email.setValue('valid@example.com');
      expect(email.valid).toBeTrue();
    });
  });

  describe('password validation', () => {
    it('should be invalid if less than 8 characters', () => {
      const password = component.registerForm.controls['password'];
      password.setValue('Abc123');
      expect(password.hasError('minlength')).toBeTrue();
    });

    it('should be invalid if no uppercase letter', () => {
      const password = component.registerForm.controls['password'];
      password.setValue('password123');
      expect(password.hasError('pattern')).toBeTrue();
    });

    it('should be invalid if no digit', () => {
      const password = component.registerForm.controls['password'];
      password.setValue('Password');
      expect(password.hasError('pattern')).toBeTrue();
    });

    it('should be valid with uppercase and digit and length >= 8', () => {
      const password = component.registerForm.controls['password'];
      password.setValue('Password1');
      expect(password.valid).toBeTrue();
    });
  });

  describe('confirmPassword validation', () => {
    it('should have passwordMismatch error if passwords do not match', () => {
      const password = component.registerForm.controls['password'];
      const confirmPassword = component.registerForm.controls['confirmPassword'];

      password.setValue('Password1');
      confirmPassword.setValue('Password2');

      // Trigger validation
      component.registerForm.updateValueAndValidity();

      expect(component.registerForm.errors?.['passwordMismatch']).toBeTrue();
      expect(confirmPassword.hasError('passwordMismatch')).toBeTrue();
    });

    it('should not have passwordMismatch error if passwords match', () => {
      const password = component.registerForm.controls['password'];
      const confirmPassword = component.registerForm.controls['confirmPassword'];

      password.setValue('Password1');
      confirmPassword.setValue('Password1');

      component.registerForm.updateValueAndValidity();

      expect(component.registerForm.errors).toBeNull();
      expect(confirmPassword.errors).toBeNull();
    });
  });

  describe('phoneNumber validation', () => {
    it('should be invalid when less than 8 digits', () => {
      const phoneNumber = component.registerForm.controls['phoneNumber'];
      phoneNumber.setValue('1234567');
      expect(phoneNumber.hasError('minlength')).toBeTrue();
    });

    it('should be invalid if contains non-numeric characters', () => {
      const phoneNumber = component.registerForm.controls['phoneNumber'];
      phoneNumber.setValue('1234abc567');
      expect(phoneNumber.hasError('pattern')).toBeTrue();
    });

    it('should be valid with 8 or more digits', () => {
      const phoneNumber = component.registerForm.controls['phoneNumber'];
      phoneNumber.setValue('12345678');
      expect(phoneNumber.valid).toBeTrue();
    });
  });

  describe('onSubmit behavior', () => {
    beforeEach(() => {
      spyOn(registrationService, 'isEmailTaken').and.returnValue(of(false));
      spyOn(registrationService, 'registerEventOrganizer').and.returnValue(of({}));
      spyOn(component['router'], 'navigate');
    });

    it('should not submit when form is invalid and mark all fields as touched', () => {
      spyOn(component.registerForm, 'markAllAsTouched');

      component.onSubmit();

      expect(component.registerForm.markAllAsTouched).toHaveBeenCalled();
      expect(registrationService.isEmailTaken).not.toHaveBeenCalled();
      expect(registrationService.registerEventOrganizer).not.toHaveBeenCalled();
    });

    it('should set emailTaken error when email is already taken', fakeAsync(() => {
      (registrationService.isEmailTaken as jasmine.Spy).and.returnValue(of(true));

      // Fill valid form data
      component.registerForm.setValue({
        fullName: 'John Doe',
        email: 'taken@example.com',
        password: 'Password1',
        confirmPassword: 'Password1',
        phoneNumber: '12345678',
        address: 'Some address',
        city: 'Some city',
      });

      component.onSubmit();
      tick();

      expect(component.registerForm.get('email')?.hasError('emailTaken')).toBeTrue();
      expect(registrationService.registerEventOrganizer).not.toHaveBeenCalled();
    }));

    it('should call registerEventOrganizer and navigate on successful submit without profile image', fakeAsync(() => {
      component.registerForm.setValue({
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'Password1',
        confirmPassword: 'Password1',
        phoneNumber: '12345678',
        address: 'Some address',
        city: 'Some city',
      });

      component.profileImageUpload = null; // no image

      component.onSubmit();
      tick();

      expect(registrationService.isEmailTaken).toHaveBeenCalledWith('john@example.com');
      expect(registrationService.registerEventOrganizer).toHaveBeenCalled();
      expect(component['router'].navigate).toHaveBeenCalledWith(['/email-confirmation-sent']);
    }));

    it('should upload image and register organizer on submit with profile image', fakeAsync(() => {
      component.registerForm.setValue({
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'Password1',
        confirmPassword: 'Password1',
        phoneNumber: '12345678',
        address: 'Some address',
        city: 'Some city',
      });

      component.profileImageUpload = new File([''], 'dummy.png', { type: 'image/png' });

      // Spy on imageService.uploadImage
      const imageService = TestBed.inject(ImageServiceService);
      spyOn(imageService, 'uploadImage').and.returnValue(of('http://image.url'));

      component.onSubmit();
      tick();

      expect(imageService.uploadImage).toHaveBeenCalledWith(component.profileImageUpload);
      expect(registrationService.registerEventOrganizer).toHaveBeenCalled();
      expect(component['router'].navigate).toHaveBeenCalledWith(['/email-confirmation-sent']);
    }));

    it('should handle error when email check fails', fakeAsync(() => {
      (registrationService.isEmailTaken as jasmine.Spy).and.returnValue(throwError(() => new Error('Error checking email')));

      // Fill valid form data
      component.registerForm.setValue({
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'Password1',
        confirmPassword: 'Password1',
        phoneNumber: '12345678',
        address: 'Some address',
        city: 'Some city',
      });

      spyOn(console, 'error');

      component.onSubmit();
      tick();

      expect(console.error).toHaveBeenCalledWith('Error finding email', jasmine.any(Error));
      expect(registrationService.registerEventOrganizer).not.toHaveBeenCalled();
    }));

    it('should handle error when image upload fails', fakeAsync(() => {
      component.registerForm.setValue({
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'Password1',
        confirmPassword: 'Password1',
        phoneNumber: '12345678',
        address: 'Some address',
        city: 'Some city',
      });

      component.profileImageUpload = new File([''], 'dummy.png', { type: 'image/png' });

      const imageService = TestBed.inject(ImageServiceService);
      spyOn(imageService, 'uploadImage').and.returnValue(throwError(() => new Error('Upload failed')));

      spyOn(console, 'error');

      component.onSubmit();
      tick();

      expect(console.error).toHaveBeenCalledWith('Error uploading image:', jasmine.any(Error));
      expect(registrationService.registerEventOrganizer).not.toHaveBeenCalled();
    }));

  });
});
