import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import {
  PUPServiceProductManagementComponent
} from './services/pupservice-product-management/pupservice-product-management.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'pup', component: PUPServiceProductManagementComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
