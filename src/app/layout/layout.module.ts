import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule} from '@angular/material/grid-list';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { EventModule } from '../event/event.module';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    NavBarComponent,
    HomeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    MatCardModule,
    MatGridListModule,
    CarouselModule,
    BrowserAnimationsModule,
    BrowserModule,
    EventModule,
    MatInputModule
  ],
  exports: [
    NavBarComponent,
    HomeComponent 
  ]
})
export class LayoutModule { }
