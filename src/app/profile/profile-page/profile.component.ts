import { Component } from '@angular/core';
import { UserService} from '../../authentication/services/user.service';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { User } from '../../authentication/services/user.modul';
import {ProfileService} from '../profile.service';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';
import {ConfirmDeactivationComponent} from '../confirm-deactivation/confirm-deactivation.component';
import {EditAccountInformationComponent} from '../edit-account-information/edit-account-information.component';
import {EditCompanyInformationComponent} from '../edit-company-information/edit-company-information.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: User;

  constructor(private userService: UserService, private router: Router, private profileService: ProfileService, private dialog: MatDialog) {
    this.user = this.userService.getUserData();
    console.log(this.user);
  }

  ngOnInit() {
    this.profileService.getProfileDetailsForPerson(this.user.id).subscribe({
      next: (response) => {
        console.log('User data loaded');

        this.user.email = response.email;
        this.user.name = response.name;
        this.user.surname = response.surname;
        this.user.address = response.location.address;
        this.user.city = response.location.city;
        this.user.phoneNumber = response.phoneNumber;
        this.user.favoriteEvents = response.favoriteEvents;
        this.user.attendingEvents = response.attendingEvents;
        this.user.favoriteSolutions = response.favoriteProducts;
        if(this.user.role === 'EVENT_ORGANIZER'){
          this.user.myEvents = response.myEvents;
        }
        if(this.user.role === 'SERVICE_PROVIDER'){
          this.user.companyName = response.companyName;
          this.user.companyEmail = response.companyEmail;
          this.user.companyPhoneNumber = response.companyPhoneNumber;
          this.user.companyDescription = response.companyDescription;
          this.user.companyLocation = response.companyLocation;
        }

      },
      error: (err) => {
        console.error('No user found error:', err);
      },
    });

  }


  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDeactivationComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('User confirmed deactivation');


        this.profileService.deactivateAccount(this.user.id).subscribe({
          next: (response) => {
            console.log('Account deactivated');
            this.userService.clearUserData();
            this.router.navigate(['/login']);
          },
          error: (err) => {
            console.error('No user found error:', err);
          },
        });

      } else {
        console.log('User cancelled deactivation');
      }
    });
  }

  openEditAccountInformation(): void {
    const dialogRef = this.dialog.open(EditAccountInformationComponent, {
      width: '500px',
      data: this.user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.user.name = result.person.name;
      this.user.surname = result.person.surname;
      this.user.address = result.person.location.address;
      this.user.city = result.person.location.city;
      this.user.phoneNumber = result.person.phoneNumber;
    });
  }

  openEditCompanyInformation(): void {
    const dialogRef = this.dialog.open(EditCompanyInformationComponent, {
      width: '500px',
      data: this.user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.user.companyPhoneNumber = result.companyPhoneNumber;
      this.user.companyDescription = result.companyDescription;
      this.user.companyLocation = result.companyLocation;
    });
  }


  openChangePasswordDialog(): void {
    this.dialog.open(ChangePasswordDialogComponent, {
      width: '500px'
    });
  }
}
