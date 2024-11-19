import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventModule } from '../event/event.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NavBarComponent,
    HomeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    EventModule,
    ReactiveFormsModule,
  ],
  exports: [
    NavBarComponent,
    HomeComponent 
  ]
})
export class LayoutModule { }
