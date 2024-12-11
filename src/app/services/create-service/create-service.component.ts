import {Component, Inject, Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Service} from '../model/service.model';
import {MatDialogRef} from '../../infrastructure/material/material.module';
import {CreateServiceDTO} from '../model/createServiceDTO.model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CategoryDTO} from '../../admin-dashboard/model/categoryDTO.model';
import {SimpleEventTypeDTO} from '../../admin-dashboard/model/simpleEventTypeDTO.model';

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
    eventType: new FormControl<string[]>([]),
    acceptance: new FormControl<string>('auto', [Validators.required]),
    available: new FormControl<boolean>(true, [Validators.required]),
    visible: new FormControl<boolean>(true, [Validators.required]),
    duration: new FormControl<number | null>(null, [Validators.required, Validators.max(1440), Validators.min(0)]),
    reservationWindow: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    cancellationWindow: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    categoryName: new FormControl<string>(''),
  });

  filteredEventTypes: SimpleEventTypeDTO[];

  constructor(public dialogRef: MatDialogRef<CreateServiceComponent>, @Inject(MAT_DIALOG_DATA) protected categories: CategoryDTO[] ) {
    this.createServiceForm.get('category')?.valueChanges.subscribe((categoryId: any) => {
      const category: CategoryDTO = this.categories.find(cat => cat.id === categoryId);
      this.filteredEventTypes = category?.eventTypes || [];
    });
  }

  create(): void {
    const categoryControl = this.createServiceForm.get('category');
    const categoryNameControl = this.createServiceForm.get('categoryName');

    // Custom validation: Ensure either category or categoryName is filled
    if (!categoryControl?.value && !categoryNameControl?.value) {
      categoryControl?.setErrors({ required: true });
      categoryNameControl?.setErrors({ required: true });
      this.createServiceForm.markAllAsTouched();
      return;
    }

    if(this.createServiceForm.valid) {
      let service :CreateServiceDTO = {
          name: this.createServiceForm.value.name,
          description: this.createServiceForm.value.description,
          pictures: [],
          basePrice: this.createServiceForm.value.basePrice,
          discount: this.createServiceForm.value.discount,
          finalPrice: this.createServiceForm.value.basePrice*(this.createServiceForm.value.discount/100),
          categoryId: this.createServiceForm.value.category,
          eventTypesIds: this.createServiceForm.value.eventType,
          autoAccept: this.createServiceForm.value.acceptance === 'auto',
          available: this.createServiceForm.value.available,
          visible: this.createServiceForm.value.visible,
          durationMinutes: this.createServiceForm.value.duration,
          reservationWindowDays: this.createServiceForm.value.reservationWindow,
          cancellationWindowDays: this.createServiceForm.value.cancellationWindow,
        };
        if (this.createServiceForm.value.categoryName) {
          service.categoryId = this.createServiceForm.value.categoryName;
        }

        this.dialogRef.close(service);
    } else {
      this.createServiceForm.markAllAsTouched();
    }
  }

}
