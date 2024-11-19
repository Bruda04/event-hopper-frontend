import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatRadioGroup} from '@angular/material/radio';
import {MatRadioButton} from '@angular/material/radio';
import {MatDialogRef} from '@angular/material/dialog';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatPaginator,
    MatSort,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    MatRadioGroup,
    MatRadioButton,
    MatOption,
    MatSelect,
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatPaginator,
    MatSort,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatCardModule,
    MatGridListModule,
    MatTabsModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    MatRadioGroup,
    MatRadioButton,
    MatOption,
    MatSelect,
  ]
})
export class MaterialModule { }
export { MatPaginator, MatSort, MatDialog, MatRadioGroup, MatRadioButton, MatDialogRef };

