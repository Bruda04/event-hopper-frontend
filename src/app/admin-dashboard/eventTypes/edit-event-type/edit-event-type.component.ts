import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from "../../../infrastructure/material/material.module";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {CategoryDTO} from '../../../shared/dto/categories/categoryDTO.model';
import {UpdateEventTypeDTO} from '../../../shared/dto/eventTypes/UpdateEventTypeDTO.model';
import {SimpleEventTypeDTO} from '../../../shared/dto/eventTypes/SimpleEventTypeDTO.model';

@Component({
  selector: 'app-edit-event-type',
  templateUrl: './edit-event-type.component.html',
  styleUrl: './edit-event-type.component.css'
})
export class EditEventTypeComponent implements OnInit {
  categories: CategoryDTO[] = []; // Available categories to choose from
  selectedCategories: string[] = []; // Selected category names
  availableCategories: CategoryDTO[] = []; // Categories that can be selected (not selected yet)
  eventTypeToEdit: SimpleEventTypeDTO;

  constructor(
    public dialogRef: MatDialogRef<EditEventTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { eventType: SimpleEventTypeDTO, allCategories: CategoryDTO[] },
  ) {

  }


  editEventTypeForm = new FormGroup({
    description: new FormControl<string>('', [Validators.required]),
  });

  update(): void {
    if (this.editEventTypeForm.valid) {
      const updateEventType:  UpdateEventTypeDTO= {
        description: this.editEventTypeForm.value.description,
        suggestedCategories: this.selectedCategories
          .map(categoryName =>
            this.categories.find(category => category.name === categoryName) // Find the category by name
          )
          .filter(category => category !== undefined),
      };
      this.dialogRef.close(updateEventType);
    } else {
      this.editEventTypeForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    if (this.data) {
      this.eventTypeToEdit = this.data.eventType;
      this.categories = this.data.allCategories;

      this.editEventTypeForm.patchValue({
        description: this.eventTypeToEdit.description,
      });

      this.selectedCategories = this.eventTypeToEdit.suggestedCategories
        ? this.eventTypeToEdit.suggestedCategories.map(category => category.name)
        : [];
      this.loadAvailableCategories();
    }
  }

  loadAvailableCategories(): void {
    // Set available categories as the categories that are not already selected
    this.availableCategories = this.categories.filter(
      category => !this.selectedCategories.includes(category.name)
    );
  }

  addCategory(categoryName: string): void {
    if (!this.selectedCategories.includes(categoryName)) {
      this.selectedCategories.push(categoryName);
      // Remove the added category from available categories
      this.availableCategories = this.availableCategories.filter(category => category.name !== categoryName);
    }
  }

  removeCategory(categoryName: string): void {
    this.selectedCategories = this.selectedCategories.filter(c => c !== categoryName);
    // Add the removed category back to available categories
    const removedCategory = this.categories.find(category => category.name === categoryName);
    if (removedCategory) {
      this.availableCategories.push(removedCategory);
    }
  }
}
