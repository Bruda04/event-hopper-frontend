import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent} from './dashboard/dashboard.component';
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
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { CreateEventTypeComponent } from './eventTypes/create-event-type/create-event-type.component';
import { DeleteCategoryComponent } from './categories/delete-category/delete-category.component';
import { AdminCommentsManagementComponent } from './comments/admin-comments-management/admin-comments-management.component';
import { ApproveCommentComponent } from './comments/approve-comment/approve-comment.component';
import { DeleteCommentComponent } from './comments/delete-comment/delete-comment.component';
import { AdminReportsManagementComponent } from './reports/admin-reports-management/admin-reports-management.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AdminApprovedCategoriesManagementComponent,
    AdminSuggestionsManagementComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    ApproveSuggestionComponent,
    EditSuggestionComponent,
    EditEventTypeComponent,
    AdminEventTypesManagementComponent,
    CreateEventTypeComponent,
    DeleteCategoryComponent,
    AdminCommentsManagementComponent,
    ApproveCommentComponent,
    DeleteCommentComponent,
    AdminReportsManagementComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PaginatorModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
  ]
})
export class AdminDashboardModule { }
