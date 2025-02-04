import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SimpleProductDTO} from '../../shared/dto/solutions/simpleProductDTO';

@Component({
  selector: 'app-budgeting-purchased-products',
  templateUrl: './budgeting-purchased-products.component.html',
  styleUrl: './budgeting-purchased-products.component.css'
})
export class BudgetingPurchasedProductsComponent {
  constructor(
    public dialogRef: MatDialogRef<BudgetingPurchasedProductsComponent>,
    @Inject(MAT_DIALOG_DATA) protected data: {products: SimpleProductDTO[], category: string, event: string}
  ) {}

  openSolution(id: string) {
    window.open(`/solutions/${id}`, '_blank');
  }
}
