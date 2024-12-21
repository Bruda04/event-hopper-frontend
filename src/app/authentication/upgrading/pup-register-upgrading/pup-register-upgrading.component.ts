import {ChangeDetectorRef, Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegistrationService} from '../../services/registration/registration.service';
import {Router} from '@angular/router';
import {CreateLocationDTO} from '../../../shared/dto/locations/CreateLocationDTO.model';
import {User} from '../../../shared/model/user.model';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {DetailedServiceProviderDTO} from '../../../shared/dto/users/serviceProvider/DetailedServiceProviderDTO.model';
import {ProfileService} from '../../../profile/profile.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-pup-register-upgrading',
  templateUrl: './pup-register-upgrading.component.html',
  styleUrl: './pup-register-upgrading.component.css'
})
export class PupRegisterUpgradingComponent {

  user: User;
  upgradeForm: FormGroup;
  imagePreview: string | null = null; // Profile image
  companyImages: { src: string, cropped: string }[] = []; // Multiple company images with cropped versions

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private profileService: ProfileService,
              private userService: UserService,
              private cdr: ChangeDetectorRef,
              ) {

    this.user = this.userService.getUserData();
    console.log(this.user);
    console.log(this.user.id);
    this.upgradeForm = this.formBuilder.group({
      companyEmail: ['', [Validators.required, Validators.email]],
      companyName: ['', Validators.required],
      companyPhoneNumber: ['', Validators.required],
      companyCity: ['', Validators.required],
      companyAddress: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {

    this.userService.clearUserData();
    this.cdr.detectChanges();
  }


  onSubmit() {
    console.log("lose");
    if (this.isFormValid()) {
      console.log("upao")
      const details: DetailedServiceProviderDTO = {
        companyEmail: this.upgradeForm.value.companyEmail,
        companyName: this.upgradeForm.value.companyName,
        companyPhoneNumber: this.upgradeForm.value.companyPhoneNumber,
        companyLocation: {
          address: this.upgradeForm.value.companyAddress,
          city: this.upgradeForm.value.companyCity,
        } as CreateLocationDTO,
        companyDescription: this.upgradeForm.value.description,
        companyPhotos: [""]
      };

      this.profileService.upgradeToPUP(this.user.id, details).subscribe(
        {
          next: result => {
            console.log(result);
          },
          error: error => {
            console.log(error);
          }
        }
      );

      this.router.navigate(['/upgrade-confirmation']);
    }


  }

  isFormValid() {

    const fields:string[] = [
        'companyEmail',
        'companyName',
        'companyPhoneNumber',
        'companyCity',
        'companyAddress',
        'description',
      ];

    fields.forEach((field) => this.upgradeForm.get(field)?.markAsTouched());
    return fields.every((field) => this.upgradeForm.get(field)?.valid);
  }


  onProfileImageSelected(event: Event) {
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

  clearProfileImage() {
    this.imagePreview = null;
  }

  // Handle company images upload (Step 2)
  onCompanyImageSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          this.companyImages.push({ src: e.target?.result as string, cropped: '' });
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }

  // Cropping function for company images
  onCompanyImageCropped(event: ImageCroppedEvent, index: number) {
    this.companyImages[index].cropped = event.base64;
  }

  clearCompanyImage(index: number) {
    this.companyImages.splice(index, 1); // Remove the selected image
  }

  triggerFileInput(step: number) {
    const inputElement = document.getElementById(step === 0 ? 'profilePic' : 'companyPictures') as HTMLInputElement;
    inputElement?.click();
  }

}
