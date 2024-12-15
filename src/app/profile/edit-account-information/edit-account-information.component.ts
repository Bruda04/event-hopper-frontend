import {Component, Inject} from '@angular/core';
import {User} from '../../authentication/services/user.modul';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ProfileService} from '../profile.service';
import {UserService} from '../../authentication/services/user.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CreateEventOrganizerDTO} from '../../shared/dto/users/eventOrganizer/CreateEventOrganizerDTO.model';
import {PersonType} from '../../shared/model/PersonType.model';
import {CreateLocationDTO} from '../../shared/dto/locations/CreateLocationDTO.model';
import {UpdatePersonDTO} from '../../shared/dto/users/person/UpdatePersonDTO.model';
import {SimpleLocationDTO} from '../../shared/dto/locations/SimpleLocationDTO.model';


function phoneMinLengthValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value?.toString() || ''; // Convert the number to a string
  return value.length >= 8 ? null : { minlength: true };
}

@Component({
  selector: 'app-edit-account-information',
  templateUrl: './edit-account-information.component.html',
  styleUrl: './edit-account-information.component.css'
})
export class EditAccountInformationComponent {
  editAccountInformationForm: FormGroup;


  constructor(private fb: FormBuilder, private router: Router, private dialogRef: MatDialogRef<EditAccountInformationComponent>,
              @Inject(MAT_DIALOG_DATA) public user: User, private profileService: ProfileService,) {
    this.editAccountInformationForm = this.fb.group(
      {
        fullName: ['', Validators.required],
        phoneNumber: ['', [Validators.required, phoneMinLengthValidator, Validators.pattern('[0-9]*')]],
        address: ['', Validators.required],
        city: ['', Validators.required],
      },
    );

  }

  ngOnInit(): void {
    this.editAccountInformationForm.patchValue({
      fullName: this.user.name + " " + this.user.surname,
      phoneNumber: this.user.phoneNumber,
      address: this.user.address,
      city: this.user.city,
    });
  }



  onSubmit(){
    if (this.editAccountInformationForm.valid) {
      const updateProfileInformationDTO: UpdatePersonDTO = {
        name: this.editAccountInformationForm.value.fullName.split(' ')[0], //first name
        surname: this.editAccountInformationForm.value.fullName.split(' ').slice(1).join(' ') || '',
        phoneNumber: this.editAccountInformationForm.value.phoneNumber,
        type: this.user.role as unknown as PersonType,
        location: {
          address: this.editAccountInformationForm.value.address,
          city: this.editAccountInformationForm.value.city,
        } as SimpleLocationDTO,
      };


      this.profileService.editProfileInformation(this.user.id, updateProfileInformationDTO).subscribe({
        next: (response) => {
          console.log('Profile information changed successfully:', response);
          this.dialogRef.close(response);
        },
        error: (err) => {
          console.error('An error was found when editing profile information:', err);
        },
      });


    }else{
      this.editAccountInformationForm.markAllAsTouched();
      console.log("Form is not valid");
    }
  }

}
