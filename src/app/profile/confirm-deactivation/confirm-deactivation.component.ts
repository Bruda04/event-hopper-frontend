import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-deactivation',
  templateUrl: './confirm-deactivation.component.html',
  styleUrl: './confirm-deactivation.component.css'
})
export class ConfirmDeactivationComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDeactivationComponent>) {}

  // Handle "Go Back" button
  onCancel(): void {
    this.dialogRef.close(false); // Close dialog and return false
  }

  // Handle "Yes, Deactivate" button
  onConfirm(): void {
    this.dialogRef.close(true); // Close dialog and return true
  }
}
