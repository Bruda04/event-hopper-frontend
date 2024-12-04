import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-approve-suggestion',
  templateUrl: './approve-suggestion.component.html',
  styleUrl: './approve-suggestion.component.css'
})
export class ApproveSuggestionComponent {
  constructor(public dialogRef: MatDialogRef<ApproveSuggestionComponent>, @Inject(MAT_DIALOG_DATA) protected categoryToApprove: string) {}

  onApprove(): void {
    this.dialogRef.close(true);
  }
}
