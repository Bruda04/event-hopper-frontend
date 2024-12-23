import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCardComponent } from './event-card/event-card.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { EventSinglePageComponent } from './event-single-page/event-single-page.component';



@NgModule({
  declarations: [
    EventCardComponent,
    EventSinglePageComponent,
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
