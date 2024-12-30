import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ProfileService} from '../profile.service';
import {UserService} from '../../authentication/services/user.service';
import {Router} from '@angular/router';
import {ChangePasswordDTO} from '../../shared/dto/users/account/ChangePasswordDTO.model';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../shared/model/user.model';
import {
  PasswordChangedSuccessfullyComponent
} from '../password-changed-successfully/password-changed-successfully.component';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrl: './change-password-dialog.component.css'
})
export class ChangePasswordDialogComponent {
  user: User;
  changePasswordForm: FormGroup;
  hideNewPassword = true;
  hideOldPassword = true;
  hideConfirmPassword: boolean = true;
  changePasswordErrorMessage: string | null = null;


  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog, // Inject MatDialog here
    private dialogRef: MatDialogRef<ChangePasswordDialogComponent> // Inject MatDialogRef here
  ) {
    this.user = this.userService.getUserData();

    this.changePasswordForm = this.fb.group(
      {
        oldPassword: ['', Validators.required],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern('.*[A-Z].*'),
            Validators.pattern('.*[0-9].*')
          ]
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator } // Add custom validator here
    );


  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
      console.log('Form valid.');

      const changePasswordDTO: ChangePasswordDTO = {
        oldPassword: this.changePasswordForm.value.oldPassword,
        newPassword: this.changePasswordForm.value.newPassword
      }

      this.profileService.changePassword(changePasswordDTO).subscribe({
        next: (response) => {
          console.log('Password changed successfully.');
          this.dialogRef.close();
          this.dialog.open(PasswordChangedSuccessfullyComponent, {
            width: '300px',
          });
        },
        error: (err) => {
          if (err.error?.message) {
            this.changePasswordErrorMessage = err.error.message; // Extract error message
          } else {
            this.changePasswordErrorMessage = 'An unexpected error occurred.';
          }
          console.error('Password error:', err);
        },
      });



    } else {
      this.changePasswordForm.markAllAsTouched();
      console.log('Form is invalid:', this.changePasswordForm.value);
    }
  }



  toggleNewPasswordVisibility() {
    this.hideNewPassword = !this.hideNewPassword;
  }

  toggleOldPasswordVisibility() {
    this.hideOldPassword = !this.hideOldPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }


  // Custom validator to check if passwords match
  passwordMatchValidator(group: FormGroup): ValidationErrors | null {
    const password = group.get('newPassword')?.value;
    const confirmPasswordControl = group.get('confirmPassword');

    if (password !== confirmPasswordControl?.value) {
      confirmPasswordControl?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPasswordControl?.setErrors(null);
      return null;
    }
  }


}
