import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitePeopleComponent } from './invite-people/invite-people.component';
import {MaterialModule} from '../infrastructure/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    InvitePeopleComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class InvitationModule { }
