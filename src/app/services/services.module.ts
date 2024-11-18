import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../infrastructure/material/material.module';
import { PUPServiceProductManagementComponent } from './pupservice-product-management/pupservice-product-management.component';
import { PUPServiceManagementComponent } from './pupservice-management/pupservice-management.component';
import { CreateServiceComponent } from './create-service/create-service.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    PUPServiceProductManagementComponent,
    PUPServiceManagementComponent,
    CreateServiceComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports:[
  ]
})
export class ServicesModule { }
