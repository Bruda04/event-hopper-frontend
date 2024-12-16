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
import { HomeComponent } from './layout/home/home.component';
import { EventModule } from './event/event.module';
import { ProfileComponent} from './profile/profile-page/profile.component';
import {AdminDashboardModule} from './admin-dashboard/admin-dashboard.module';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import { LocationComponent } from './location/location.component';
import { ServiceProviderProfileComponent } from './profile/service-provider-profile/service-provider-profile.component';
import { ChangePasswordDialogComponent } from './profile/change-password-dialog/change-password-dialog.component';
import { ConfirmDeactivationComponent } from './profile/confirm-deactivation/confirm-deactivation.component';
import { EditAccountInformationComponent } from './profile/edit-account-information/edit-account-information.component';
import { ProfileCalendarComponent } from './profile/profile-calendar/profile-calendar.component';
import { FavoriteEventsComponent } from './profile/favorite-events/favorite-events.component';
import { FavoriteSolutionsComponent } from './profile/favorite-solutions/favorite-solutions.component';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { EditCompanyInformationComponent } from './profile/edit-company-information/edit-company-information.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LocationComponent,
    ServiceProviderProfileComponent,
    ChangePasswordDialogComponent,
    ConfirmDeactivationComponent,
    EditAccountInformationComponent,
    ProfileCalendarComponent,
    FavoriteEventsComponent,
    FavoriteSolutionsComponent,
    EditCompanyInformationComponent,
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
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
