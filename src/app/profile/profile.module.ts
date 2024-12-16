import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule} from '../infrastructure/material/material.module';
import { EditCompanyInformationComponent} from './edit-company-information/edit-company-information.component';
import { UpgradeProfileComponent} from './upgrade-profile/upgrade-profile.component';
import { ChangePasswordDialogComponent} from './change-password-dialog/change-password-dialog.component';
import { ConfirmDeactivationComponent} from './confirm-deactivation/confirm-deactivation.component';
import { EditAccountInformationComponent} from './edit-account-information/edit-account-information.component';
import { ProfileCalendarComponent} from './profile-calendar/profile-calendar.component';
import { FavoriteEventsComponent} from './favorite-events/favorite-events.component';
import { FavoriteSolutionsComponent} from './favorite-solutions/favorite-solutions.component';
import { ProfileComponent} from './profile-page/profile.component';
import {LocationComponent} from '../location/location.component';
import {
  CalendarDayModule,
  CalendarModule,
  CalendarMonthModule,
  CalendarWeekModule,
  DateAdapter
} from 'angular-calendar';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {SolutionsModule} from '../solutions/solutions.module';
import {EventModule} from '../event/event.module';



@NgModule({
  declarations: [
    ProfileComponent,
    LocationComponent,
    ChangePasswordDialogComponent,
    ConfirmDeactivationComponent,
    EditAccountInformationComponent,
    ProfileCalendarComponent,
    FavoriteEventsComponent,
    FavoriteSolutionsComponent,
    EditCompanyInformationComponent,
    UpgradeProfileComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    CalendarMonthModule,
    CalendarWeekModule,
    CalendarDayModule,
    SolutionsModule,
    EventModule,
    MaterialModule,
    CalendarModule,
  ]
})
export class ProfileModule { }
