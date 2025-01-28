import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-comment',
  templateUrl: './delete-comment.component.html',
  styleUrl: './delete-comment.component.css'
})
export class DeleteCommentComponent {

  constructor(public dialogRef: MatDialogRef<DeleteCommentComponent>, @Inject(MAT_DIALOG_DATA) protected commentToDelete: string) {}

  onDelete(): void {
    this.dialogRef.close(true);
  }
}
