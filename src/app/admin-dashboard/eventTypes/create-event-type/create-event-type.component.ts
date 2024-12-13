import { Component } from '@angular/core';
import { MatDialogRef } from "../../../infrastructure/material/material.module";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {CategoriesService} from '../../categories/categories.service';
import {CategoryDTO} from '../../../shared/dto/categories/categoryDTO.model';
import {EventType} from '../../../shared/model/eventType.model';

@Component({
  selector: 'app-create-event-type',
  templateUrl: './create-event-type.component.html',
  styleUrls: ['./create-event-type.component.css']
})
export class CreateEventTypeComponent {
  categories : CategoryDTO[];

  constructor(public dialogRef: MatDialogRef<CreateEventTypeComponent>, private categoriesService: CategoriesService) {
    categoriesService.getApproved().subscribe({
      next: (categories: CategoryDTO[]) => {
        this.categories = categories;
      },
      error: (_) => {
        console.error("Error loading categories");
      }
    });
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
      const eventType: EventType = {
        name: this.createEventTypeForm.value.name,
        description: this.createEventTypeForm.value.description,
        suggestedSolutionCategories: this.createEventTypeForm.value.suggestedSolutionCategories,
        isDeactivated: false // default value, can be changed based on requirements
      };
      this.dialogRef.close(eventType);
    } else {
      this.createEventTypeForm.markAllAsTouched();
    }
  }
}
