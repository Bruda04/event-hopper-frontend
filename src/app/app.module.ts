import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LayoutModule } from './layout/layout.module';
import {ServicesModule} from './services/services.module';
import { LoginComponent } from './layout/login/login.component';
import { RegisterComponent } from './layout/register/register.component';
import { ProfileComponent } from './layout/profile/profile.component';
import { MaterialModule } from './infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PupRegisterSlide1Component } from './layout/register/pup-register-slide1/pup-register-slide1.component';
import { PupRegisterSlide2Component } from './pup-register-slide2/pup-register-slide2.component';
import { OrganizerRegisterSlide1Component } from './organizer-register-slide1/organizer-register-slide1.component';
import { OrganizerRegisterSlide2Component } from './organizer-register-slide2/organizer-register-slide2.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    PupRegisterSlide1Component,
    PupRegisterSlide2Component,
    OrganizerRegisterSlide1Component,
    OrganizerRegisterSlide2Component,
    ConfirmEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    ServicesModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
