import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { OrganizerRegisterComponent } from './authentication/register/organizer-register/organizer-register.component';
import { PupRegisterComponent } from './authentication/register/pup-register/pup-register.component';
import { EmailConfirmationSentComponent } from './authentication/email-confirmation-sent/email-confirmation-sent.component';
import { DashboardComponent} from './admin-dashboard/dashboard/dashboard.component';
import {
  PUPServiceProductManagementComponent
} from './solutions/pupservice-product-management/pupservice-product-management.component';
import {roleGuard} from './authentication/guards/role.guard';
import {SolutionPageComponent} from './solutions/solution-page/solution-page.component';
import {ServiceProviderPageComponent} from './service-provider-page/service-provider-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register-pup', component: PupRegisterComponent },
  { path: 'register-organizer', component: OrganizerRegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'email-confirmation-sent', component: EmailConfirmationSentComponent },
  { path: 'my-solutions', component: PUPServiceProductManagementComponent,
    canActivate: [roleGuard],
    data: { role: 'SERVICE_PROVIDER' }  },
  {
    path: 'admin-dashboard', component: DashboardComponent,
    canActivate: [roleGuard],
    data: { role: 'ADMIN' }
  },
  { path: 'solutions/:id', component: SolutionPageComponent },
  { path: 'providers/:id', component: ServiceProviderPageComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
