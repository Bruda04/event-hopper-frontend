import { Component } from '@angular/core';
import {User} from '../../shared/model/user.model';
import {UserService} from '../../authentication/services/user.service';
import {Router} from '@angular/router';
import {NotificationService} from '../notification.service';
import {ProfileService} from '../../profile/profile.service';
import {ProfileForPersonDTO} from '../../shared/dto/users/account/ProfileForPersonDTO.model';
import {NotificationDTO} from '../../shared/dto/notifications/notificationDTO.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {

  user: User;
  mute = false;

  constructor(private userService: UserService,
              private router: Router,
              private notificationService: NotificationService,
              private profileService: ProfileService,
              ) {
    this.user = this.userService.getUserData();
  }

  notifications: NotificationDTO[] = [];

  ngOnInit(): void {
    this.profileService.getProfileDetailsForPerson().subscribe({

      next:(response: ProfileForPersonDTO) => {
        this.notifications = response.notifications;

      },

      error: (err) => {
        console.error('No user found error:', err);
      },
    });
  }


    toggleMute():void {
      this.mute = !this.mute;
    }

}
