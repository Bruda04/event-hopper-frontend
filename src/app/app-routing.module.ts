import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ProfileComponent } from './authentication/profile/profile.component';


import {
  PUPServiceProductManagementComponent
} from './services/pupservice-product-management/pupservice-product-management.component';
import { ConfirmEmailComponent } from './authentication/confirm-email/confirm-email.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },  //default route (always open to home)
  {path: 'login', component: LoginComponent },
  {path: 'profile', component: ProfileComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'home', component: HomeComponent}, 
  {path: 'confirm-email', component: ConfirmEmailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
