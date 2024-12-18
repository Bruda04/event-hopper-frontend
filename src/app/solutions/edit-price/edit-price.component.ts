import {Component, Inject} from '@angular/core';
import {MatDialogRef} from '../../infrastructure/material/material.module';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PriceManagementDTO} from '../../shared/dto/prices/PriceManagementDTO.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UpdateCategoryDTO} from '../../shared/dto/categories/UpdateCategoryDTO.model';
import {UpdatePriceDTO} from '../../shared/dto/prices/updatePriceDTO.model';

@Component({
  selector: 'app-edit-price',
  templateUrl: './edit-price.component.html',
  styleUrl: './edit-price.component.css'
})
export class EditPriceComponent {
  constructor(public dialogRef: MatDialogRef<EditPriceComponent>, @Inject(MAT_DIALOG_DATA) private priceToEdit: PriceManagementDTO) {}

  editPriceForm = new FormGroup({
    basePrice: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    discount: new FormControl<number | null>(null, [Validators.required, Validators.max(100), Validators.min(0)]),
  });

  update(): void {
    if(this.editPriceForm.valid) {
      const price :UpdatePriceDTO = {
        basePrice: this.editPriceForm.value.basePrice,
        discount: this.editPriceForm.value.discount,
      };
      this.dialogRef.close(price);
    } else {
      this.editPriceForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.editPriceForm.patchValue(this.priceToEdit);
  }
}
