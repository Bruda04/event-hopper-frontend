import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogSelectEventComponent } from './dialog-select-event/dialog-select-event.component';
import { DialogBuyProductComponent } from './dialog-buy-product/dialog-buy-product.component';
import {MatButton} from '@angular/material/button';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {PaginatorModule} from 'primeng/paginator';
import {ReactiveFormsModule} from '@angular/forms';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';



@NgModule({
  declarations: [
    DialogSelectEventComponent,
    DialogBuyProductComponent
  ],
  imports: [
    CommonModule,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatLabel,
    PaginatorModule,
    ReactiveFormsModule,
    MatOption,
    MatSelect
  ]
})
export class ReservationModule { }
