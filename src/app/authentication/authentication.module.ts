import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { OrganizerRegisterComponent } from './register/organizer-register/organizer-register.component';
import { PupRegisterComponent } from './register/pup-register/pup-register.component';
import { LayoutModule } from '../layout/layout.module';
import { ServicesModule } from '../services/services.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../infrastructure/material/material.module';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router'; // Import RouterModule


@NgModule({
  declarations: [
    LoginComponent,
    ConfirmEmailComponent,
    ProfileComponent,
    RegisterComponent,
    OrganizerRegisterComponent,
    PupRegisterComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    ServicesModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    RouterModule
  ],
  exports: [
    LoginComponent,
    ConfirmEmailComponent,
    ProfileComponent,
    RegisterComponent,
    OrganizerRegisterComponent
  ]
})
export class AuthenticationModule { }
