import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../env/envirements';
import {ConversationPreviewDTO} from '../shared/dto/messages/conversationPreviewDTO.model';
import {ChatMessageDTO} from '../shared/dto/messages/chatMessageDTO.model';
import {NewChatMessageDTO} from '../shared/dto/messages/NewChatMessageDTO.model';
import {WebSocketService} from '../authentication/services/web-sockets/web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private onMessageReceivedCallback: (message: ChatMessageDTO) => void;

  constructor(private HttpClient: HttpClient, private webSocketService: WebSocketService) {
    this.webSocketService.setOnMessageReceivedCallback(this.onMessageReceivedCallback);
  }

  getConversationsPreview(): Observable<ConversationPreviewDTO[]> {
    return this.HttpClient.get<ConversationPreviewDTO[]>(environment.apiHost + '/chat/conversations-preview');
  }

  getChatHistory(username: string): Observable<ChatMessageDTO[]> {
    return this.HttpClient.get<ChatMessageDTO[]>(environment.apiHost + '/chat/history/' +  username);
  }

  sendMessage(message: NewChatMessageDTO): void {
    this.webSocketService.sendToChannel("/app/chat", message);
  }

  setOnMessageReceivedCallback(callback: (message: ChatMessageDTO) => void): void {
    this.onMessageReceivedCallback = callback;
  }
}
