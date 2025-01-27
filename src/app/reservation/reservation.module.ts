import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingAServiceComponent } from './booking-a-service/booking-a-service.component';
import {MatDialogContent} from "@angular/material/dialog";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatFormField, MatHint, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {MaterialModule} from '../infrastructure/material/material.module';



@NgModule({
  declarations: [
    BookingAServiceComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class ReservationModule { }
