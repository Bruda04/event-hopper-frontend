import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './layout/login/login.component';
import { RegisterComponent } from './layout/register/register.component';
import { ProfileComponent } from './layout/profile/profile.component';


import {
  PUPServiceProductManagementComponent
} from './services/pupservice-product-management/pupservice-product-management.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },  //default route (always open to home)
  {path: 'login', component: LoginComponent },
  {path: 'profile', component: ProfileComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'home', component: HomeComponent},
  {path: 'pup', component: PUPServiceProductManagementComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
