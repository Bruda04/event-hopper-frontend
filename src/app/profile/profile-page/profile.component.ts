import { Component } from '@angular/core';
import { UserService} from '../../authentication/services/user.service';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { User } from '../../authentication/services/user.modul';
import {ProfileService} from '../profile.service';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';


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
        this.user.address = response.location.city + " " + response.location.address;
        this.user.phoneNumber = response.phoneNumber;
      },
      error: (err) => {
        console.error('No user found error:', err);
      },
    });

  }




  openChangePasswordDialog(): void {
    this.dialog.open(ChangePasswordDialogComponent, {
      width: '500px', // Adjust width of the popup
    });
  }
}
