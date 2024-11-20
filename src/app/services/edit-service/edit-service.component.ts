import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '../../infrastructure/material/material.module';
import {Service} from '../model/service.model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrl: './edit-service.component.css'
})
export class EditServiceComponent implements OnInit {

  editServiceForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
    acceptance: new FormControl<string>('auto', [Validators.required]),
    available: new FormControl<boolean>(true, [Validators.required]),
    visible: new FormControl<boolean>(true, [Validators.required]),
    duration: new FormControl<number | null>(null, [Validators.required, Validators.max(1440), Validators.min(0)]),
    reservationWindow: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    cancellationWindow: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
  });

  constructor(public dialogRef: MatDialogRef<EditServiceComponent>,@Inject(MAT_DIALOG_DATA) private serviceToEdit: Service) {}

  update(): void {
    console.log(this.serviceToEdit);
    if(this.editServiceForm.valid) {
      const service :Service = {
        ...this.serviceToEdit,
        name: this.editServiceForm.value.name,
        description: this.editServiceForm.value.description,
        autoAccept: this.editServiceForm.value.acceptance === 'auto',
        available: this.editServiceForm.value.available,
        visible: this.editServiceForm.value.visible,
        duration: this.editServiceForm.value.duration,
        reservationWindow: this.editServiceForm.value.reservationWindow,
        cancellationWindow: this.editServiceForm.value.cancellationWindow,
      };
      this.dialogRef.close(service);
    } else {
      this.editServiceForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.editServiceForm.patchValue(this.serviceToEdit);
  }




}
