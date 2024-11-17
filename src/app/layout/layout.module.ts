import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule} from '@angular/material/grid-list';



@NgModule({
  declarations: [
    NavBarComponent,
    HomeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    MatCardModule,
    MatGridListModule
  ],
  exports: [
    NavBarComponent,
    HomeComponent 
  ]
})
export class LayoutModule { }
