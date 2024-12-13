import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventModule } from '../event/event.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { SolutionsModule } from '../solutions/solutions.module';
import { NotificationModule } from '../notification/notification.module';


@NgModule({
  declarations: [
    NavBarComponent,
    HomeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    EventModule,
    SolutionsModule,
    ReactiveFormsModule,
    CarouselModule,
    ButtonModule,
    TagModule,
    NotificationModule,
  ],
  exports: [
    NavBarComponent,
    HomeComponent ,
    CarouselModule,
    ButtonModule,
    TagModule,
  ]
})
export class LayoutModule { }
