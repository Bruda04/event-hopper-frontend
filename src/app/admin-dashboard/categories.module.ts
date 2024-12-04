import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCategoriesSuggestionsManagementComponent} from './categories/admin-categories-suggestions-management/admin-categories-suggestions-management.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { AdminApprovedCategoriesManagementComponent } from './categories/admin-approved-categories-management/admin-approved-categories-management.component';
import { AdminSuggestionsManagementComponent } from './categories/admin-suggestions-management/admin-suggestions-management.component';
import { CreateCategoryComponent } from './categories/create-category/create-category.component';
import { EditCategoryComponent } from './categories/edit-category/edit-category.component';
import {PaginatorModule} from 'primeng/paginator';
import {ReactiveFormsModule} from '@angular/forms';
import { ApproveSuggestionComponent } from './categories/approve-suggestion/approve-suggestion.component';
import { EditSuggestionComponent } from './categories/edit-suggestion/edit-suggestion.component';
import { EditEventTypeComponent } from './eventTypes/edit-event-type/edit-event-type.component';
import {
  AdminEventTypesManagementComponent
} from './eventTypes/admin-event-types-management/admin-event-types-management.component';

@NgModule({
  declarations: [
    AdminCategoriesSuggestionsManagementComponent,
    AdminApprovedCategoriesManagementComponent,
    AdminSuggestionsManagementComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    ApproveSuggestionComponent,
    EditSuggestionComponent,
    EditEventTypeComponent,
    AdminEventTypesManagementComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PaginatorModule,
    ReactiveFormsModule,
  ]
})
export class CategoriesModule { }
