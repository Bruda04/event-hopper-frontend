import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ProfileComponent} from './profile/profile-page/profile.component';
import { OrganizerRegisterComponent } from './authentication/register/organizer-register/organizer-register.component';
import { PupRegisterComponent } from './authentication/register/pup-register/pup-register.component';
import { EmailConfirmationSentComponent } from './authentication/email-confirmation-sent/email-confirmation-sent.component';
import { DashboardComponent} from './admin-dashboard/dashboard/dashboard.component';
import {
  PUPServiceProductManagementComponent
} from './solutions/pupservice-product-management/pupservice-product-management.component';
import {roleGuard} from './authentication/guards/role.guard';
import {EventSinglePageComponent} from './event/event-single-page/event-single-page.component';
import {UserRegisterComponent} from './authentication/register/user-register/user-register.component';
import {InvitationRedirectionComponent} from './invitation/invitation-redirection/invitation-redirection.component';
import {
  PupRegisterUpgradingComponent
} from './authentication/upgrading/pup-register-upgrading/pup-register-upgrading.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent ,
    canActivate: [roleGuard],
    data: { roles:  ['SERVICE_PROVIDER', 'ADMIN', 'AUTHENTICATED_USER', 'EVENT_ORGANIZER']  } },
  { path: 'register', component: RegisterComponent },
  { path: 'register-pup', component: PupRegisterComponent },
  { path: 'upgrading-register-pup', component: PupRegisterUpgradingComponent},
  { path: 'register-organizer', component: OrganizerRegisterComponent },
  { path: 'register-user', component: UserRegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'email-confirmation-sent', component: EmailConfirmationSentComponent },
  { path: 'invitations/:id', component: InvitationRedirectionComponent },
  { path: 'event', component: EventSinglePageComponent },
  { path: 'my-solutions', component: PUPServiceProductManagementComponent,
    canActivate: [roleGuard],
    data: { roles: ['SERVICE_PROVIDER'] }  },
  {
    path: 'admin-dashboard', component: DashboardComponent,
    canActivate: [roleGuard],
    data: { roles: ['ADMIN'] }
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
