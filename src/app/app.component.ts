import { Component } from '@angular/core';
import {WebSocketService} from './authentication/services/web-sockets/web-socket.service';
import {UserService} from './authentication/services/user.service';
import {ToastService} from './toast/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EventHopper';
  mute = false;

  constructor(private userService: UserService, private socket: WebSocketService, private toastService: ToastService) {
    // učitavanje mute stanja iz localStorage
    const savedMute = localStorage.getItem('notificationsMuted');
    this.mute = savedMute === 'true';

    // inicijalizacija WebSocket konekcije samo ako je korisnik logovan
    if (this.userService.getUserData()?.id) {
      this.socket.initConnection();

      // registracija callback-a za dolazne notifikacije
      this.socket.setOnNotificationReceivedCallback((notification: any) => {
        if (!this.mute) {
          this.toastService.show(notification.content);
        }
      });
    }
  }

  toggleMute(): void {
    this.mute = !this.mute;
    localStorage.setItem('notificationsMuted', this.mute.toString());
    console.log('Notifications muted:', this.mute);
  }
}
