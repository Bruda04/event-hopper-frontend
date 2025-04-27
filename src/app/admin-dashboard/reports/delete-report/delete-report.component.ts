import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-report',
  templateUrl: './delete-report.component.html',
  styleUrl: './delete-report.component.css'
})
export class DeleteReportComponent {

  constructor(public dialogRef: MatDialogRef<DeleteReportComponent>, @Inject(MAT_DIALOG_DATA) protected reportedUser: string) {}


  onDelete(): void {
    this.dialogRef.close(true);
  }

}
