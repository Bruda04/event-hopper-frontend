import { Component } from '@angular/core';

import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RegistrationService} from '../../services/registration/registration.service';
import {CreateAuthenticatedUserDTO} from '../../../shared/dto/users/authenticatedUser/CreateAuthenticatedUserDTO.model';
import {PersonType} from '../../../shared/model/PersonType.model';
import {CreateLocationDTO} from '../../../shared/dto/locations/CreateLocationDTO.model';
import {CreateAuthenticatedUserAccountDTO} from '../../../shared/dto/users/account/CreateAuthenticatedUserAccountDTO.model';
import {CreateRegistrationRequestDTO} from '../../../shared/dto/registrationRequest/CreateRegistrationRequestDTO.model';
import {InvitationService} from '../../../invitation/invitation.service';
import {ImageServiceService} from '../../../shared/services/image-service.service';

function phoneMinLengthValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value?.toString() || ''; // Convert the number to a string
  return value.length >= 8 ? null : { minlength: true };
}


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {

  registerForm: FormGroup;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  imagePreview: string | null = null;
  usersEmail: string ="";
  profileImageUpload: File;
  profileImageUrl: string = "";

  invitationId: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private registrationService: RegistrationService,
              private invitationService: InvitationService,
              private imageService: ImageServiceService,
) {

    this.registerForm = this.formBuilder.group(
      {
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl({ value: this.usersEmail, disabled: true }, [Validators.required, Validators.email]),
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
    { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.invitationId = params['invitationId'];
    });

    this.invitationService.getInvitation(this.invitationId).subscribe(
      {
        next: (response) => {
          this.usersEmail = response.targetEmail;
        },
        error: error => {
          console.log(error);
        }
      });
  }

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

      const createAuthenticatedUserDTO: CreateAuthenticatedUserDTO = {
        name: this.registerForm.value.fullName.split(' ')[0], //first name
        surname: this.registerForm.value.fullName.split(' ').slice(1).join(' ') || '',
        profilePicture: "",
        phoneNumber: this.registerForm.value.phoneNumber,
        type: PersonType.AUTHENTICATED_USER,
        location: {
          address: this.registerForm.value.address,
          city: this.registerForm.value.city,
        } as CreateLocationDTO,
      };

      const createAccount: CreateAuthenticatedUserAccountDTO = {
        email: this.usersEmail,
        password: this.registerForm.value.password,
        isVerified: false,
        suspensionTimeStamp: null,
        type: PersonType.AUTHENTICATED_USER,
        person: createAuthenticatedUserDTO,
        registrationRequest:{} as CreateRegistrationRequestDTO,
      }

      console.log('Account Submitted:',createAccount);
      if(this.profileImageUpload != null){
        this.imageService.uploadImage(this.profileImageUpload).subscribe({
          next: (url:string) => {
            createAccount.person.profilePicture = url;

            this.registrationService.registerAuthenticatedUser(createAccount).subscribe({
              next: (response) => {
                //this.router.navigate(['/email-confirmation-sent']);
                this.router.navigate(['/login'],{ queryParams: { invitationId: this.invitationId } });
              },
              error: (err) => {
                console.error('Error registering event organizer:', err);
              },
            });
          },
          error: (err) => {
            console.error('Error uploading image:', err);
          }
        });
      }
      else{
        this.registrationService.registerAuthenticatedUser(createAccount).subscribe({
          next: (response) => {
            console.log('Authenticated user registered successfully:', response);
            //this.router.navigate(['/email-confirmation-sent']);
            this.router.navigate(['/login'],{ queryParams: { invitationId: this.invitationId } });
          },
          error: (err) => {
            console.error('Error registering event organizer:', err);
          },
        });
      }

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
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }

    this.profileImageUpload = file;
    this.profileImageUrl = URL.createObjectURL(file);
  }

  clearImage() {
    this.imagePreview = null; // Clear preview
    this.profileImageUrl = "";
    this.profileImageUpload = null;
  }

  triggerFileInput() {
    const fileInput = document.getElementById('profilePic') as HTMLInputElement;
    fileInput?.click();
  }


}
