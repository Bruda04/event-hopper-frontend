import { Component } from '@angular/core';
import {WebSocketService} from './authentication/services/web-sockets/web-socket.service';
import {UserService} from './authentication/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EventHopper';

  constructor(private userService: UserService, private socket: WebSocketService) {
    this.socket.initConnection();
  }
}
