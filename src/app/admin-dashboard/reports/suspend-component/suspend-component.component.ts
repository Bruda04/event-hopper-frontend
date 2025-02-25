import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-suspend-component',
  templateUrl: './suspend-component.component.html',
  styleUrl: './suspend-component.component.css'
})
export class SuspendComponentComponent {

  constructor(public dialogRef: MatDialogRef<SuspendComponentComponent>, @Inject(MAT_DIALOG_DATA) protected reportedUser: string) {}

  onSuspend(): void {
    this.dialogRef.close(true);
  }

}
