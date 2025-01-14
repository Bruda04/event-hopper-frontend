import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../env/envirements';
import {CompatClient, IMessage, Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {UserService} from '../user.service';
import {MessageService} from '../../../chat/message.service';
import {ChatMessageDTO} from '../../../shared/dto/messages/chatMessageDTO.model';

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
      {Authorization: `Bearer ${this.userService.getToken()}`},
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

  private onNotificationReceivedCallback: (message: any) => void;
  private onMessageReceivedCallback: (message: ChatMessageDTO) => void;

  setOnNotificationReceivedCallback(callback: (message: any) => void): void {
    this.onNotificationReceivedCallback = callback;
  }

  setOnMessageReceivedCallback(callback: (message: ChatMessageDTO) => void): void {
    this.onMessageReceivedCallback = callback;
  }

  private subscribeToChannels() {
    this.subscribeToChannel(`/user/topic/notifications`, (message: any): void => {
      this.onNotificationReceivedCallback(message);
      console.log(message);
    });
    this.subscribeToChannel(`/user/topic/chat`, (message: ChatMessageDTO): void => {
      this.onMessageReceivedCallback(message);
      console.log(message);
    });
  }
}
