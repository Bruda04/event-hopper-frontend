import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from "../../../infrastructure/material/material.module";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventType } from '../../model/eventType.model';

@Component({
  selector: 'app-edit-event-type',
  templateUrl: './edit-event-type.component.html',
  styleUrl: './edit-event-type.component.css'
})
export class EditEventTypeComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditEventTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public eventTypeToEdit: EventType
  ) {}

  editEventTypeForm = new FormGroup({
    description: new FormControl<string>('', [Validators.required]),
  });

  update(): void {
    if (this.editEventTypeForm.valid) {
      const updatedEventType: EventType = {
        ...this.eventTypeToEdit,
        description: this.editEventTypeForm.value.description,
      };
      this.dialogRef.close(updatedEventType);
    } else {
      this.editEventTypeForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.editEventTypeForm.patchValue({
      description: this.eventTypeToEdit.description,
    });
  }
}
