import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogSelectEventComponent } from './dialog-select-event/dialog-select-event.component';
import { DialogBuyProductComponent } from './dialog-buy-product/dialog-buy-product.component';



@NgModule({
  declarations: [
    DialogSelectEventComponent,
    DialogBuyProductComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ReservationModule { }
