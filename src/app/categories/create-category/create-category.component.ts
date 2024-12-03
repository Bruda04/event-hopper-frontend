import { Component } from '@angular/core';
import {MatDialogRef} from '../../infrastructure/material/material.module';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from '../model/category.model';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css'
})
export class CreateCategoryComponent {

  constructor(public dialogRef: MatDialogRef<CreateCategoryComponent>) {}

  createCategoryForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
  });

  create(): void {
    if(this.createCategoryForm.valid) {
      const category :Category = {
        name: this.createCategoryForm.value.name,
        description: this.createCategoryForm.value.description,
        isDeletable: true
      };
      console.log(category);
      this.dialogRef.close(category);
    } else {
      this.createCategoryForm.markAllAsTouched();
    }
  }
}
