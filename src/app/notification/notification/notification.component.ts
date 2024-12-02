import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {

    mute = false;

    notifications = [
      { title: 'Metal Head Concert CANCELED',timestamp:'02/12/2024 23:05', content: 'A dialog is a type of modal window that appears in front.' },
    { title: 'Florist “Amina” sent you a message',timestamp:'01/12/2024 10:05', content: 'A dialog is a type of modal window that appears in front.' },
    { title: 'Anika Molaw accepted your invite!',timestamp:'29/11/2024 23:00', content: 'A dialog is a type of modal window that appears in front.' },
    { title: '“Hiko” Gallery Opening Postponed',timestamp:'26/11/2024 17:05', content: 'A dialog is a type of modal window that appears in front.' },
 
    ];


    toggleMute():void {
      this.mute = !this.mute;
    }

}
