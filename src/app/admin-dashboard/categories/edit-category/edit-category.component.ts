import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from "../../../infrastructure/material/material.module"
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryDTO} from '../../model/categoryDTO.model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {UpdateCategoryDTO} from '../../model/UpdateCategoryDTO.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditCategoryComponent>, @Inject(MAT_DIALOG_DATA) private categoryToEdit: CategoryDTO) {}

  editCategoryForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
  });

  update(): void {
    if(this.editCategoryForm.valid) {
      const category :UpdateCategoryDTO = {
        name: this.editCategoryForm.value.name,
        description: this.editCategoryForm.value.description,
        status: this.categoryToEdit.status,
        eventTypesIds: this.categoryToEdit.eventTypes.map(et => et.id)

      };
      this.dialogRef.close(category);
    } else {
      this.editCategoryForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.editCategoryForm.patchValue(this.categoryToEdit);
  }
}
