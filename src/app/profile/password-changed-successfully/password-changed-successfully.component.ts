import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-password-changed-successfully',
  templateUrl: './password-changed-successfully.component.html',
  styleUrl: './password-changed-successfully.component.css'
})
export class PasswordChangedSuccessfullyComponent {
  constructor(private dialogRef: MatDialogRef<PasswordChangedSuccessfullyComponent>) {}

  ngOnInit(): void {
    // Automatically close the dialog after 3 seconds
    setTimeout(() => this.dialogRef.close(), 3000);
  }
}
