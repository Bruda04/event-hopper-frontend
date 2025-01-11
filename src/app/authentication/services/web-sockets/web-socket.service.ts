import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../env/envirements';
import {CompatClient, IMessage, Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {UserService} from '../user.service';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private stompClient: CompatClient;
  public isLoaded: boolean = false;

  constructor(private http: HttpClient, private userService: UserService) {}

  initConnection(): void {
    let wsf: () => WebSocket = (): WebSocket => {
      return new WebSocket(environment.apiWebSocket);
    };
    this.stompClient = Stomp.over(wsf);
    this.stompClient.debug = (): void => {};

    this.stompClient.connect(
      {},
      (): void => {
        this.isLoaded = true;
        this.subscribeToChannels();
      }
    );
  }

  subscribeToChannel(channel: string, callback: (message: any) => void): void {
    if (this.isLoaded) {
      console.log('Subscribing to channel: ' + channel);
      this.stompClient.subscribe(
        channel,
        (message: IMessage): void => {callback(JSON.parse(message.body));}
      );
    }
  }

  sendToChannel(channel: string, message: any): void {
    if (this.isLoaded) {
      this.stompClient.send(channel, {}, JSON.stringify(message));
    }
  }

  disconnect(): void {
    if (this.stompClient && this.isLoaded) {
      this.stompClient.disconnect((): void => {
        this.isLoaded = false;
      });
    }
  }

  private subscribeToChannels() {
    this.subscribeToChannel(`/notifications/${this.userService.getUserData().id}`, (message: any): void => {
      // Call the notification service to display the notification
    });
    this.subscribeToChannel(`/messages/${this.userService.getUserData().id}`, (message: any): void => {
      // Call the chat service to display the message
    });
  }
}
