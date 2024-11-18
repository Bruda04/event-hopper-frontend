import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../infrastructure/material/material.module';
import { PUPServiceProductManagementComponent } from './pupservice-product-management/pupservice-product-management.component';
import { PUPServiceManagementComponent } from './pupservice-management/pupservice-management.component';
import { CreateServiceComponent } from './create-service/create-service.component';
import {ReactiveFormsModule} from '@angular/forms';
import { EditServiceComponent } from './edit-service/edit-service.component';



@NgModule({
  declarations: [
    PUPServiceProductManagementComponent,
    PUPServiceManagementComponent,
    CreateServiceComponent,
    EditServiceComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class ServicesModule { }
