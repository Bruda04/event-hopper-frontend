import {Component, Inject} from '@angular/core';
import {MatDialogRef} from '../../infrastructure/material/material.module';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SimpleEventDTO} from '../../shared/dto/events/simpleEventDTO.model';

@Component({
  selector: 'app-dialog-select-event',
  templateUrl: './dialog-select-event.component.html',
  styleUrl: './dialog-select-event.component.css'
})
export class DialogSelectEventComponent {
  constructor(public dialogRef: MatDialogRef<DialogSelectEventComponent>,
              @Inject(MAT_DIALOG_DATA) protected events: SimpleEventDTO[]
              ) {}

  choseEventForm = new FormGroup({
    event: new FormControl<string>(null, [Validators.required]),
  });

  chose(): void {
    if(this.choseEventForm.valid) {
      this.dialogRef.close(this.choseEventForm.value.event);
    } else {
      this.choseEventForm.markAllAsTouched();
    }
  }
}
