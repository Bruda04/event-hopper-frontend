import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Service} from '../model/service.model';
import {MatDialogRef} from '../../infrastructure/material/material.module';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrl: './create-service.component.css'
})
export class CreateServiceComponent {

  createServiceForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
    basePrice: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    discount: new FormControl<number | null>(null, [Validators.required, Validators.max(100), Validators.min(0)]),
    category: new FormControl<string>('', [Validators.required]),
    eventType: new FormControl<string[]>([], [Validators.required]),
    acceptance: new FormControl<string>('auto', [Validators.required]),
    available: new FormControl<boolean>(true, [Validators.required]),
    visible: new FormControl<boolean>(true, [Validators.required]),
    duration: new FormControl<number | null>(null, [Validators.required, Validators.max(1440), Validators.min(0)]),
    reservationWindow: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    cancellationWindow: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
  });

  constructor(public dialogRef: MatDialogRef<CreateServiceComponent>) {}

  create(): void {
    if(this.createServiceForm.valid) {
      const service :Service = {
          name: this.createServiceForm.value.name,
          description: this.createServiceForm.value.description,
          basePrice: this.createServiceForm.value.basePrice,
          discount: this.createServiceForm.value.discount,
          finalPrice: this.createServiceForm.value.basePrice*(this.createServiceForm.value.discount/100),
          category: this.createServiceForm.value.category,
          eventType: this.createServiceForm.value.eventType,
          autoAccept: this.createServiceForm.value.acceptance === 'auto',
          available: this.createServiceForm.value.available,
          visible: this.createServiceForm.value.visible,
          duration: this.createServiceForm.value.duration,
          reservationWindow: this.createServiceForm.value.reservationWindow,
          cancellationWindow: this.createServiceForm.value.cancellationWindow,
        };
        this.dialogRef.close(service);
    } else {
      this.createServiceForm.markAllAsTouched();
    }
  }

}
