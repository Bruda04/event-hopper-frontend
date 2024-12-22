import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitePeopleComponent } from './invite-people/invite-people.component';
import {MaterialModule} from '../infrastructure/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import { InvitationRedirectionComponent } from './invitation-redirection/invitation-redirection.component';
import { InviteConfirmationComponent } from './invite-confirmation/invite-confirmation.component';



@NgModule({
  declarations: [
    InvitePeopleComponent,
    InvitationRedirectionComponent,
    InviteConfirmationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class InvitationModule { }
