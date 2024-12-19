import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OrganizerRegisterComponent } from './register/organizer-register/organizer-register.component';
import { PupRegisterComponent } from './register/pup-register/pup-register.component';
import { LayoutModule } from '../layout/layout.module';
import { SolutionsModule } from '../solutions/solutions.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../infrastructure/material/material.module';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { EmailConfirmationSentComponent } from './email-confirmation-sent/email-confirmation-sent.component'; // Import RouterModule
import { ImageCropperComponent } from 'ngx-image-cropper';
import { UserRegisterComponent } from './register/user-register/user-register.component';
import { UpgradingComponent } from './upgrading/upgrading.component';
import { CongradulationComponent } from './upgrading/congradulation/congradulation.component';
import { PupRegisterUpgradingComponent } from './upgrading/pup-register-upgrading/pup-register-upgrading.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    OrganizerRegisterComponent,
    PupRegisterComponent,
    EmailConfirmationSentComponent,
    UserRegisterComponent,
    UpgradingComponent,
    CongradulationComponent,
    PupRegisterUpgradingComponent,
  ],
  imports: [
    CommonModule,
    LayoutModule,
    SolutionsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    RouterModule,
    ImageCropperComponent
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    OrganizerRegisterComponent
  ]
})
export class AuthenticationModule { }
