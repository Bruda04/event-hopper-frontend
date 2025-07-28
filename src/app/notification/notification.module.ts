import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification/notification.component';
// import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MaterialModule } from '../infrastructure/material/material.module';


@NgModule({
  declarations: [
    NotificationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    NotificationComponent
  ]
})
export class NotificationModule { }
