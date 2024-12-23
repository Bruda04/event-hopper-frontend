import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrl: './delete-category.component.css'
})
export class DeleteCategoryComponent {
  constructor(public dialogRef: MatDialogRef<DeleteCategoryComponent>, @Inject(MAT_DIALOG_DATA) protected categoryToDelete: string) {}

  onDelete(): void {
    this.dialogRef.close(true);
  }
}
