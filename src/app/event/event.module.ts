import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCardComponent } from './event-card/event-card.component';
import { MaterialModule } from '../infrastructure/material/material.module';
//import { CarouselComponent } from './carousel/carousel.component';



@NgModule({
  declarations: [
    EventCardComponent,
    //CarouselComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ], 
  exports:[
    EventCardComponent
  ]
})
export class EventModule { }
