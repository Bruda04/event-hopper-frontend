import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-invite-confirmation',
  templateUrl: './invite-confirmation.component.html',
  styleUrl: './invite-confirmation.component.css'
})
export class InviteConfirmationComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { success: boolean },
    private dialogRef: MatDialogRef<InviteConfirmationComponent>,
    private cdr: ChangeDetectorRef

  ) {
  }
  onOk(): void {
    this.dialogRef.close(); // Zatvaranje modala
    this.cdr.detectChanges(); // Ručno osvežavanje prikaza

  }
}
