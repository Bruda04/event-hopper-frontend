import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-suggestion',
  templateUrl: './edit-suggestion.component.html',
  styleUrl: './edit-suggestion.component.css'
})
export class EditSuggestionComponent {
  constructor(public dialogRef: MatDialogRef<EditSuggestionComponent>, @Inject(MAT_DIALOG_DATA) protected product: any) {}

  editProductsCategoryForm = new FormGroup({
    category: new FormControl<string>('', [Validators.required]),
  });

  onSave(): void {
    if (this.editProductsCategoryForm.valid) {
      this.dialogRef.close();
    }
    this.dialogRef.close(true);
  }
}
