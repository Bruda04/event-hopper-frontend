import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {ProfileService} from '../profile.service';
import {UserService} from '../../authentication/services/user.service';
import {User} from '../../shared/model/user.model';
import {Router} from '@angular/router';
import {UserData} from '../../shared/model/userData.model';

@Component({
  selector: 'app-confirm-deactivation',
  templateUrl: './confirm-deactivation.component.html',
  styleUrl: './confirm-deactivation.component.css'
})
export class ConfirmDeactivationComponent {
  user: UserData;
  isDeletable: boolean;
  errorMessage: string;

  constructor(public dialogRef: MatDialogRef<ConfirmDeactivationComponent>,
              private profileService: ProfileService,
              private userService: UserService,
              private router: Router) {
    this.user = userService.getUserData();
    this.isDeletable = true;
  }

  // Handle "Go Back" button
  onCancel(): void {
    this.dialogRef.close(false); // Close dialog and return false
  }

  // Handle "Yes, Deactivate" button
  onConfirm(): void {
    this.profileService.deactivateAccount().subscribe({
      next: () => {
        console.log('Account deactivated');
        this.userService.clearToken();
        this.dialogRef.close();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isDeletable = false;
        if(this.user.role === 'EVENT_ORGANIZER'){
          this.errorMessage = "Your account can't be deactivated, you have upcoming events."
        }else if(this.user.role == 'SERVICE_PROVIDER'){
          this.errorMessage = "Your account can't be deactivated, you have upcoming bookings."
        }
        console.error('Cant be deactivated:', err);
      },
    });

  }
}
