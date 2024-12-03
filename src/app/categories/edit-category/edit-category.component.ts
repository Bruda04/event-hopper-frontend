import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from '../../infrastructure/material/material.module';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from '../model/category.model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditCategoryComponent>, @Inject(MAT_DIALOG_DATA) private categoryToEdit: Category) {}

  editCategoryForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
  });

  update(): void {
    if(this.editCategoryForm.valid) {
      const category :Category = {
        ...this.categoryToEdit,
        name: this.editCategoryForm.value.name,
        description: this.editCategoryForm.value.description,
      };
      console.log(category);
      this.dialogRef.close(category);
    } else {
      this.editCategoryForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.editCategoryForm.patchValue(this.categoryToEdit);
  }
}
