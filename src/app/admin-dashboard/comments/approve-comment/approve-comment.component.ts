import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-approve-comment',
  templateUrl: './approve-comment.component.html',
  styleUrl: './approve-comment.component.css'
})
export class ApproveCommentComponent {

  constructor(public dialogRef: MatDialogRef<ApproveCommentComponent>, @Inject(MAT_DIALOG_DATA) protected commentToApprove: string) {}

  onApprove(): void {
    this.dialogRef.close(true);
  }
}
