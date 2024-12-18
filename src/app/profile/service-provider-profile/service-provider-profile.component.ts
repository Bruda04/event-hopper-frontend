import { Component } from '@angular/core';
import { UserService} from '../../authentication/services/user.service';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { Router } from '@angular/router';
import { User } from '../../authentication/services/user.modul';
import {PersonType} from "../../shared/model/PersonType.model";

@Component({
  selector: 'app-service-provider-profile',
  templateUrl: './service-provider-profile.component.html',
  styleUrl: './service-provider-profile.component.css'
})
export class ServiceProviderProfileComponent {
  user: User;

  constructor(private userService: UserService, private router: Router) {
    this.user = this.userService.getUserData();
  }


}
