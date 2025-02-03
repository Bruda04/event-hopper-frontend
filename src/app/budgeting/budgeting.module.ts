import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetManagementComponent } from './budget-management/budget-management.component';
import {MaterialModule} from '../infrastructure/material/material.module';



@NgModule({
  declarations: [
    BudgetManagementComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ]
})
export class BudgetingModule { }
