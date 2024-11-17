import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../infrastructure/material/material.module';
import { PUPServiceProductManagementComponent } from './pupservice-product-management/pupservice-product-management.component';
import { PUPServiceManagementComponent } from './pupservice-management/pupservice-management.component';



@NgModule({
  declarations: [
    PUPServiceProductManagementComponent,
    PUPServiceManagementComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class ServicesModule { }
