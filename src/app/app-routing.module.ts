import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { OrganizerRegisterComponent } from './authentication/register/organizer-register/organizer-register.component';
import { PupRegisterComponent } from './authentication/register/pup-register/pup-register.component';
import { EmailConfirmationSentComponent } from './authentication/email-confirmation-sent/email-confirmation-sent.component';

import {
  PUPServiceProductManagementComponent
} from './services/pupservice-product-management/pupservice-product-management.component';
import {
  AdminCategoriesSuggestionsManagementComponent
} from './categories/admin-categories-suggestions-management/admin-categories-suggestions-management.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },  //default route (always open to home)
  {path: 'login', component: LoginComponent },
  {path: 'profile', component: ProfileComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'register-pup', component: PupRegisterComponent },
  {path: 'register-organizer', component:  OrganizerRegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'email-confirmation-sent', component: EmailConfirmationSentComponent},
  {path: 'my-solutions', component: PUPServiceProductManagementComponent},
  {path: 'categories', component: AdminCategoriesSuggestionsManagementComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
