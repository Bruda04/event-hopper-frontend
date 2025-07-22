import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PupRegisterComponent } from './pup-register.component';
import {ReactiveFormsModule, AbstractControl, FormGroup} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {of, throwError} from 'rxjs';
import {CreateServiceProviderAccountDTO} from '../../../shared/dto/users/account/CreateServiceProviderAccountDTO.model';

describe('PupRegisterComponent', () => {
  let component: PupRegisterComponent;
  let fixture: ComponentFixture<PupRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PupRegisterComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PupRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Validation', () => {
    let form: AbstractControl;

    beforeEach(() => {
      form = component.registerForm;
    });

    it('should invalidate form if required fields are empty', () => {
      form.setValue({
        fullName: '',
        email: '',
        phoneNumber: '',
        city: '',
        address: '',
        companyEmail: '',
        password: '',
        confirmPassword: '',
        companyName: '',
        companyPhoneNumber: '',
        companyCity: '',
        companyAddress: '',
        description: '',
        endTime: '',
        startTime: ''
      });
      expect(form.valid).toBeFalse();
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

    it('should validate fullName with at least two words', () => {
      const fullNameControl = form.get('fullName');

      fullNameControl?.setValue('SingleWord');
      expect(fullNameControl?.errors?.['fullNameInvalid']).toBeTrue();

      fullNameControl?.setValue('John Doe');
      expect(fullNameControl?.errors).toBeNull();
    });

    it('should validate email format', () => {
      const emailControl = form.get('email');

      emailControl?.setValue('invalid-email');
      expect(emailControl?.errors?.['email']).toBeTruthy();

      emailControl?.setValue('valid@example.com');
      expect(emailControl?.errors).toBeNull();
    });

    it('should validate phoneNumber with pattern and min length', () => {
      const phoneControl = form.get('phoneNumber');

      phoneControl?.setValue('123');  // too short
      expect(phoneControl?.valid).toBeFalse();

      phoneControl?.setValue('abcdefgh'); // invalid pattern
      expect(phoneControl?.valid).toBeFalse();

      phoneControl?.setValue('12345678'); // valid
      expect(phoneControl?.valid).toBeTrue();
    });

    it('should invalidate if password and confirmPassword do not match', () => {
      form.get('password')?.setValue('Password1');
      form.get('confirmPassword')?.setValue('Password2');

      component.passwordMatchValidator(form as FormGroup);
      expect(form.errors?.['passwordMismatch']).toBeTrue();
      expect(form.get('confirmPassword')?.errors?.['passwordMismatch']).toBeTrue();
    });

    it('should validate if password and confirmPassword match', () => {
      form.get('password')?.setValue('Password1');
      form.get('confirmPassword')?.setValue('Password1');

      component.passwordMatchValidator(form as FormGroup);
      expect(form.errors).toBeNull();
      expect(form.get('confirmPassword')?.errors).toBeNull();
    });
  });

  describe('Navigation steps', () => {
    it('should increment currentStep if email is not taken', fakeAsync(() => {
      spyOn(component.registrationService, 'isEmailTaken').and.returnValue(of(false));

      component.registerForm.patchValue({
        fullName: 'John Doe',
        email: 'available@example.com',
        phoneNumber: '12345678',
        city: 'City',
        address: 'Address',
      });

      component.currentStep = 0;
      component.onNext();
      tick();

      expect(component.currentStep).toBe(1);
      expect(component.registerForm.get('email')?.errors).toBeNull();
    }));

    it('should set emailTaken error and NOT increment step if email is taken', fakeAsync(() => {
      spyOn(component.registrationService, 'isEmailTaken').and.returnValue(of(true));

      component.registerForm.patchValue({
        fullName: 'John Doe',
        email: 'taken@example.com',
        phoneNumber: '12345678',
        city: 'City',
        address: 'Address',
      });

      component.currentStep = 0;
      component.onNext();
      tick();

      expect(component.currentStep).toBe(0);
      expect(component.registerForm.get('email')?.errors?.['emailTaken']).toBeTrue();
    }));

    it('should not increment currentStep if currentStep != 0', () => {
      component.currentStep = 1;
      component.onNext();
      expect(component.currentStep).toBe(1); // no change
    });

    it('should decrement currentStep on onBack if currentStep > 0', () => {
      component.currentStep = 1;
      component.onBack();
      expect(component.currentStep).toBe(0);
    });

    it('should not decrement currentStep on onBack if currentStep == 0', () => {
      component.currentStep = 0;
      component.onBack();
      expect(component.currentStep).toBe(0);
    });
  });


  describe('Form Submission and Image Upload', () => {
    beforeEach(() => {
      component.registerForm.patchValue({
        fullName: 'John Doe',
        email: 'test@example.com',
        phoneNumber: '12345678',
        city: 'City',
        address: 'Address',
        companyEmail: 'company@example.com',
        password: 'Password1',
        confirmPassword: 'Password1',
        companyName: 'Company',
        companyPhoneNumber: '12345678',
        companyCity: 'CompanyCity',
        companyAddress: 'CompanyAddress',
        description: 'Company description',
        startTime: '09:00',
        endTime: '17:00'
      });
    });

    it('should handle error when email check fails', fakeAsync(() => {
      spyOn(component.registrationService, 'isEmailTaken').and.returnValue(throwError(() => new Error('Network error')));
      spyOn(console, 'error');

      component.registerForm.get('email')?.setValue('test@example.com');
      component.onNext();
      tick();

      expect(console.error).toHaveBeenCalledWith('Error finding email', jasmine.any(Error));
    }));

    it('should handle error when image upload fails', fakeAsync(() => {
      spyOn(component.imageService, 'uploadImage').and.returnValue(throwError(() => new Error('Upload failed')));
      spyOn(console, 'error');

      component.uploadedImages = [new File(['dummy'], 'img1.png')];
      component.imageUrls = ['some/url']; // force to enter image upload path

      component.onSubmit();
      tick();

      expect(console.error).toHaveBeenCalledWith('Error uploading images', jasmine.any(Error));
    }));

    it('should set emailTaken error when email is already taken', fakeAsync(() => {
      spyOn(component.registrationService, 'isEmailTaken').and.returnValue(of(true));

      component.registerForm.get('email')?.setValue('taken@example.com');
      component.onNext();
      tick();

      const emailControl = component.registerForm.get('email');
      expect(emailControl?.errors?.['emailTaken']).toBeTrue();
    }));


    it('should not call registration if form invalid', () => {
      spyOn(component.registrationService, 'isEmailTaken').and.returnValue(of(false));
      component.registerForm.patchValue({ email: '' }); // invalidate form

      component.onSubmit();

      // Since step 1 is invalid (companyEmail etc.), no API calls expected
      expect(component.registerForm.valid).toBeFalse();
    });

    it('should upload images and register account if images present', fakeAsync(() => {
      const uploadedImageUrl = 'http://image.url/company1.png';
      spyOn(component.imageService, 'uploadImage').and.returnValue(of(uploadedImageUrl));
      spyOn(component['router'], 'navigate').and.stub();
      spyOn(component.registrationService, 'registerServiceProvider').and.returnValue(of({}));

      spyOn(component, 'uploadProfilePictureAndAccount').and.callThrough();

      // images to upload
      component.uploadedImages = [new File(['content'], 'img1.png')];
      component.imageUrls = ['http://image.url/img1.png'];

      component.onSubmit();
      tick();

      expect(component.imageService.uploadImage).toHaveBeenCalled();
      expect(component.uploadProfilePictureAndAccount).toHaveBeenCalled();
      expect(component.registrationService.registerServiceProvider).toHaveBeenCalled(); // It's called inside uploadProfilePictureAndAccount
      expect(component['router'].navigate).toHaveBeenCalledWith(['/email-confirmation-sent']);
    }));

    it('should register account directly if no company images to upload', fakeAsync(() => {
      spyOn(component.registrationService, 'registerServiceProvider').and.returnValue(of({}));
      spyOn(component['router'], 'navigate').and.stub();
      spyOn(component, 'uploadProfilePictureAndAccount').and.callThrough();


      component.uploadedImages = [];
      component.imageUrls = [];

      component.onSubmit();
      tick();

      expect(component.uploadProfilePictureAndAccount).toHaveBeenCalled();
      expect(component.registrationService.registerServiceProvider).toHaveBeenCalled(); // Called inside uploadProfilePictureAndAccount
      expect(component['router'].navigate).toHaveBeenCalledWith(['/email-confirmation-sent']);
    }));

    it('uploadProfilePictureAndAccount should upload profile image then register', fakeAsync(() => {
      component.profileImageUpload = new File(['content'], 'profile.png');
      spyOn(component.imageService, 'uploadImage').and.returnValue(of('http://image.url/profile.png'));
      spyOn(component.registrationService, 'registerServiceProvider').and.returnValue(of({}));
      spyOn(component['router'], 'navigate').and.stub();

      const account: CreateServiceProviderAccountDTO = {
        email: 'test@example.com',
        password: 'Password1',
        isVerified: false,
        suspensionTimeStamp: null,
        type: 0,
        person: {} as any,
        registrationRequest: {} as any
      };

      component.uploadProfilePictureAndAccount(account);
      tick();

      expect(component.imageService.uploadImage).toHaveBeenCalledWith(component.profileImageUpload);
      expect(component.registrationService.registerServiceProvider).toHaveBeenCalledWith(account);
      expect(component['router'].navigate).toHaveBeenCalledWith(['/email-confirmation-sent']);
    }));

    it('uploadProfilePictureAndAccount should register even if no profile image', fakeAsync(() => {
      component.profileImageUpload = null;
      spyOn(component.registrationService, 'registerServiceProvider').and.returnValue(of({}));
      spyOn(component.imageService, 'uploadImage').and.stub();
      spyOn(component['router'], 'navigate').and.stub();

      const account: CreateServiceProviderAccountDTO = {
        email: 'test@example.com',
        password: 'Password1',
        isVerified: false,
        suspensionTimeStamp: null,
        type: 0,
        person: {} as any,
        registrationRequest: {} as any
      };

      component.uploadProfilePictureAndAccount(account);
      tick();

      expect(component.imageService.uploadImage).not.toHaveBeenCalled();
      expect(component.registrationService.registerServiceProvider).toHaveBeenCalledWith(account);
      expect(component['router'].navigate).toHaveBeenCalledWith(['/email-confirmation-sent']);
    }));

  });

});
