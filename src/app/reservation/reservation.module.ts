import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingAServiceComponent } from './booking-a-service/booking-a-service.component';
import {MaterialModule} from '../infrastructure/material/material.module';

import { DialogSelectEventComponent } from './dialog-select-event/dialog-select-event.component';
import { DialogBuyProductComponent } from './dialog-buy-product/dialog-buy-product.component';
import {PaginatorModule} from 'primeng/paginator';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    BookingAServiceComponent,
    DialogSelectEventComponent,
    DialogBuyProductComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    PaginatorModule,
  ],
})
export class ReservationModule { }
