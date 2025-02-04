import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetManagementComponent } from './budget-management/budget-management.component';
import {MaterialModule} from '../infrastructure/material/material.module';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    BudgetManagementComponent
  ],
    imports: [
      CommonModule,
      MaterialModule,
      ReactiveFormsModule,
    ]
})
export class BudgetingModule { }
