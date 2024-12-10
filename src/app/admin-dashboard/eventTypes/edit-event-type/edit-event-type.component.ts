import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from "../../../infrastructure/material/material.module";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventType } from '../../model/eventType.model';
import { CategoryDTO } from '../../model/categoryDTO.model';
import {CategoriesService} from '../../categories/categories.service';

@Component({
  selector: 'app-edit-event-type',
  templateUrl: './edit-event-type.component.html',
  styleUrl: './edit-event-type.component.css'
})
export class EditEventTypeComponent implements OnInit {
  categories: CategoryDTO[] = []; // Available categories to choose from
  selectedCategories: string[] = []; // Selected category names
  availableCategories: CategoryDTO[] = []; // Categories that can be selected (not selected yet)

  constructor(
    public dialogRef: MatDialogRef<EditEventTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public eventTypeToEdit: EventType,
    private categoriesService: CategoriesService
  ) {

  }

  editEventTypeForm = new FormGroup({
    description: new FormControl<string>('', [Validators.required]),
  });

  update(): void {
    if (this.editEventTypeForm.valid) {
      const updatedEventType: EventType = {
        ...this.eventTypeToEdit,
        description: this.editEventTypeForm.value.description,
        suggestedSolutionCategories: this.selectedCategories,
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

    this.categoriesService.getApproved().subscribe({
      next: (categories: CategoryDTO[]) => {
        this.categories = categories;
        // Initialize selected categories and available categories
        this.selectedCategories = [...(this.eventTypeToEdit.suggestedSolutionCategories || [])];
        this.loadAvailableCategories();
      },
      error: (_) => {
        console.error("Error loading categories");
      }
    });
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
