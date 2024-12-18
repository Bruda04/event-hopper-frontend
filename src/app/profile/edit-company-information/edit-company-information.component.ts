import {Component, Inject} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ProfileService} from '../profile.service';
import {LocationDTO} from '../../shared/dto/locations/LocationDTO.model';
import {UpdateCompanyAccountDTO} from '../../shared/dto/users/account/UpdateCompanyAccountDTO.model';
import {UpdatedCompanyAccountDTO} from '../../shared/dto/users/account/UpdatedCompanyAccountDTO.model';
import {User} from '../../shared/model/user.model';

function phoneMinLengthValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value?.toString() || ''; // Convert the number to a string
  return value.length >= 8 ? null : { minlength: true };
}


@Component({
  selector: 'app-edit-company-information',
  templateUrl: './edit-company-information.component.html',
  styleUrl: './edit-company-information.component.css'
})
export class EditCompanyInformationComponent {
  editCompanyInformationForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private dialogRef: MatDialogRef<EditCompanyInformationComponent>,
              @Inject(MAT_DIALOG_DATA) public user: User, private profileService: ProfileService,) {
    this.editCompanyInformationForm = this.fb.group(
      {
        description: ['', Validators.required],
        phoneNumber: ['', [Validators.required, phoneMinLengthValidator, Validators.pattern('[0-9]*')]],
        address: ['', Validators.required],
        city: ['', Validators.required],
      },
    );

  }

  ngOnInit(): void {
    this.editCompanyInformationForm.patchValue({
      description: this.user.companyDescription,
      phoneNumber: this.user.companyPhoneNumber,
      address: this.user.companyLocation.address,
      city: this.user.companyLocation.city,
    });
  }

  onSubmit(){
    if (this.editCompanyInformationForm.valid) {
      console.log("Form is valid")
      const updateCompanyAccountDTO: UpdateCompanyAccountDTO = {
        id: this.user.id,
        companyPhoneNumber: this.editCompanyInformationForm.value.phoneNumber,
        companyDescription:this.editCompanyInformationForm.value.description,
        companyLocation: {
          address: this.editCompanyInformationForm.value.address,
          city: this.editCompanyInformationForm.value.city,
        } as LocationDTO,
      };


      this.profileService.editCompanyInformation(this.user.id, updateCompanyAccountDTO).subscribe({
        next: (response) => {
          console.log('Company information changed successfully:', response);
          this.dialogRef.close(response);
        },
        error: (err) => {
          console.error('An error was found when editing company information:', err);
        },
      });


    }else{
      console.log("Form is not valid");
    }
  }
}
