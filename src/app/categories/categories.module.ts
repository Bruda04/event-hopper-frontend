import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCategoriesSuggestionsManagementComponent } from './admin-categories-suggestions-management/admin-categories-suggestions-management.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { AdminApprovedCategoriesManagementComponent } from './admin-approved-categories-management/admin-approved-categories-management.component';
import { AdminSuggestionsManagementComponent } from './admin-suggestions-management/admin-suggestions-management.component';

@NgModule({
  declarations: [
    AdminCategoriesSuggestionsManagementComponent,
    AdminApprovedCategoriesManagementComponent,
    AdminSuggestionsManagementComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ]
})
export class CategoriesModule { }
