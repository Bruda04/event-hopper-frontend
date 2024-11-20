import { Component } from '@angular/core';
import { NavigationStateService } from '../authentication/services/navigation-state.service';
import { MaterialModule } from '../infrastructure/material/material.module';
import { Router } from '@angular/router';
import { User } from '../authentication/services/user.modul';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: User;

  constructor(private navigationStateService: NavigationStateService, private router: Router) {
    this.user = this.navigationStateService.getUserData();
  }



}
