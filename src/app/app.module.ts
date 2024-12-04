import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layout/layout.module';
import { ServicesModule } from './services/services.module';
import { AuthenticationModule } from './authentication/authentication.module'; // Import AuthenticationModule here
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './infrastructure/material/material.module';
import { HomeComponent } from './layout/home/home.component';
import { EventModule } from './event/event.module';
import { ProfileComponent } from './profile/profile.component';
import {AdminDashboardModule} from './admin-dashboard/admin-dashboard.module';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    AuthenticationModule,
    ReactiveFormsModule,
    MaterialModule,
    EventModule,
    ServicesModule,
    AdminDashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
