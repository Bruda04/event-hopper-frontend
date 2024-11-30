import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCategoriesSuggestionsManagementComponent } from './admin-categories-suggestions-management/admin-categories-suggestions-management.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { AdminApprovedCategoriesManagementComponent } from './admin-approved-categories-management/admin-approved-categories-management.component';
import { AdminSuggestionsManagementComponent } from './admin-suggestions-management/admin-suggestions-management.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import {PaginatorModule} from 'primeng/paginator';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AdminCategoriesSuggestionsManagementComponent,
    AdminApprovedCategoriesManagementComponent,
    AdminSuggestionsManagementComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PaginatorModule,
    ReactiveFormsModule,
  ]
})
export class CategoriesModule { }
