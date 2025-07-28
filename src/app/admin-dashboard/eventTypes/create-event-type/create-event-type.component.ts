import {Component, Inject} from '@angular/core';
import { MatDialogRef } from "../../../infrastructure/material/material.module";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {EventType} from '../../../shared/model/eventType.model';
import {SimpleCategoryDTO} from '../../../shared/dto/categories/simpleCategoryDTO.model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CreateEventTypeDTO} from '../../../shared/dto/eventTypes/CreateEventTypeDTO.model';

@Component({
  selector: 'app-create-event-type',
  templateUrl: './create-event-type.component.html',
  styleUrls: ['./create-event-type.component.css']
})
export class CreateEventTypeComponent {
  categories : SimpleCategoryDTO[];

  constructor(public dialogRef: MatDialogRef<CreateEventTypeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { categories: SimpleCategoryDTO[] } ) {

    this.categories = data.categories;
  }

  onCategorySelect(selectedCategories: string[]): void {
    this.createEventTypeForm.patchValue({ suggestedSolutionCategories: selectedCategories });
  }

  createEventTypeForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
    suggestedSolutionCategories: new FormControl<string[]>([], [Validators.required]),
  });

  create(): void {
    if(this.createEventTypeForm.valid) {
      const eventType: CreateEventTypeDTO = {
        name: this.createEventTypeForm.value.name,
        description: this.createEventTypeForm.value.description,
        suggestedCategories: this.createEventTypeForm.value.suggestedSolutionCategories
          .map(categoryName =>
            this.categories.find(category => category.name === categoryName) // Find the category by name
          )
          .filter(category => category !== undefined),

      };
      this.dialogRef.close(eventType);
    } else {
      this.createEventTypeForm.markAllAsTouched();
    }
  }
}
