import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layout/layout.module';
import { SolutionsModule } from './solutions/solutions.module';
import { AuthenticationModule } from './authentication/authentication.module'; // Import AuthenticationModule here
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './infrastructure/material/material.module';
import { EventModule } from './event/event.module';
import {AdminDashboardModule} from './admin-dashboard/admin-dashboard.module';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {InvitationModule} from './invitation/invitation.module';
import {ProfileModule} from './profile/profile.module';
import { ServiceProviderPageComponent } from './service-provider-page/service-provider-page.component';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';

import {HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi} from '@angular/common/http';
import { AuthInterceptor} from './authentication/guards/AuthInterceptor';
import { ViewMyEventsComponent } from './view-my-events/view-my-events.component';
import { CreateEventComponent } from './view-my-events/create-event/create-event.component';
import {ReportModule} from './report/report.module';

@NgModule({
  declarations: [
    AppComponent,
    ServiceProviderPageComponent,
    ViewMyEventsComponent,
    CreateEventComponent,
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
    SolutionsModule,
    AdminDashboardModule,
    InvitationModule,
    AdminDashboardModule,
    ProfileModule,
    ReportModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,  // Allows multiple interceptors to be used
    },
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
