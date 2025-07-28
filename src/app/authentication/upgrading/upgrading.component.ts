import {ChangeDetectorRef, Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '../../infrastructure/material/material.module';
import {UserService} from '../services/user.service';
import {User} from '../../shared/model/user.model';
import {CongradulationComponent} from './congradulation/congradulation.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ProfileService} from '../../profile/profile.service';

@Component({
  selector: 'app-upgrading',
  templateUrl: './upgrading.component.html',
  styleUrl: './upgrading.component.css'
})
export class UpgradingComponent {

  user: User;

  constructor(private dialogRef: MatDialogRef<UpgradingComponent>,
              private dialog: MatDialog,
              private router: Router,
              private profileService: ProfileService,
              private userService: UserService,

              ) {
    this.user = userService.getUserData();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onOrganizer(): void {
    this.dialogRef.close();

    this.profileService.upgradeToOD().subscribe(
      {
        next: result => {
          this.user = result;
          this.dialog.open(CongradulationComponent, {
            width: '500px',
          });
        },

        error: err => {
          console.log(err);
        }
      }
    )
  }

  onServiceProvider():void{
    this.dialogRef.close();
    this.router.navigate(['/upgrading-register-pup']);

  }
}
