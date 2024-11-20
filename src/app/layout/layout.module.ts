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
import { ServicesModule } from '../services/services.module';


@NgModule({
  declarations: [
    NavBarComponent,
    HomeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    EventModule,
    ServicesModule,
    ReactiveFormsModule,
    CarouselModule,
    ButtonModule,
    TagModule,
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
