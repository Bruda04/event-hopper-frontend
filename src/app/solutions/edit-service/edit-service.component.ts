import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '../../infrastructure/material/material.module';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ServiceManagementDTO} from '../../shared/dto/solutions/serviceManagementDTO.model';
import {SimpleEventTypeDTO} from '../../shared/dto/eventTypes/simpleEventTypeDTO.model';
import {UpdateServiceDTO} from '../../shared/dto/solutions/updateServiceDTO.model';


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
    durationMinutes: new FormControl<number | null>(null, [Validators.required, Validators.max(1440), Validators.min(0)]),
    reservationWindowDays: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    cancellationWindowDays: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    eventTypes: new FormControl<string[]>([], [Validators.required]),
  });

  eventTypes: SimpleEventTypeDTO[];
  serviceToEdit: ServiceManagementDTO;

  constructor(public dialogRef: MatDialogRef<EditServiceComponent>,
              @Inject(MAT_DIALOG_DATA) data: { serviceToEdit: ServiceManagementDTO, eventTypes: SimpleEventTypeDTO[] }
  ) {
    this.serviceToEdit = data.serviceToEdit;
    this.eventTypes = data.eventTypes;
    if (!this.eventTypes) {
      this.eventTypes = this.serviceToEdit.eventTypes;

    }
  }

  update(): void {
    if(this.editServiceForm.valid) {
      const service :UpdateServiceDTO = {
        name: this.editServiceForm.value.name,
        description: this.editServiceForm.value.description,
        autoAccept: this.editServiceForm.value.acceptance === 'auto',
        available: this.editServiceForm.value.available,
        visible: this.editServiceForm.value.visible,
        durationMinutes: this.editServiceForm.value.durationMinutes,
        reservationWindowDays: this.editServiceForm.value.reservationWindowDays,
        cancellationWindowDays: this.editServiceForm.value.cancellationWindowDays,
        pictures: this.serviceToEdit.pictures,
        eventTypesIds: this.editServiceForm.value.eventTypes,
      };
      this.dialogRef.close(service);
    } else {
      this.editServiceForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    const serviceToEdit = {
      ...this.serviceToEdit,
      eventTypes: this.serviceToEdit.eventTypes.map(eventType => eventType.id)
    };
    this.editServiceForm.patchValue(serviceToEdit);
    if (!this.eventTypes) {
      this.editServiceForm.get('eventTypes').disable();
    }
  }




}
