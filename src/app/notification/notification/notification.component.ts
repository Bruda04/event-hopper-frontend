import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {

    mute = false;

    notifications = [
      { title: 'Metal Head Concert CANCELED', content: 'A dialog is a type of modal window that appears in front.' },
    { title: 'Florist “Amina” sent you a message', content: 'A dialog is a type of modal window that appears in front.' },
    { title: 'Anika Molaw accepted your invite!', content: 'A dialog is a type of modal window that appears in front.' },
    { title: '“Hiko” Gallery Opening Postponed', content: 'A dialog is a type of modal window that appears in front.' },
 
    ];


    toggleMute():void {
      this.mute = !this.mute;
    }

}
