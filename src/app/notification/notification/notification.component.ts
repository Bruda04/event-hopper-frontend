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
  selectedNotification: NotificationDTO | null = null;
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

    const savedMute = localStorage.getItem('notificationsMuted');   //from local storage we get string value "true" or "false"
    this.mute = savedMute === 'true';         //if savedMute is "true" then mute is true (boolean)

    this.profileService.getProfileDetailsForPerson().subscribe({

      next:(response: ProfileForPersonDTO) => {

        this.notifications = response.notifications;

      },

      error: (err) => {
        console.error('No user found error:', err);
      },
    });
  }

  notificationClick(notification: NotificationDTO) {
    console.log(notification);
    let productId = notification.productID;
    let eventId = notification.eventID;

    this.selectedNotification = notification;
    console.log(productId);
    console.log(eventId);
    if (productId !== null && productId !== undefined){
      this.router.navigate(['/solutions/',productId]);
      return
    }

    if (eventId !== null && eventId !== undefined){
      this.router.navigate(['/events/',productId]);
      return
    }
  }


    toggleMute():void {
      this.mute = !this.mute;
      localStorage.setItem('notificationsMuted', this.mute.toString());
      console.log(this.mute.toString());
    }

}
