import {Component, EventEmitter, Output} from '@angular/core';
import {ConversationPreviewDTO} from '../../shared/dto/messages/conversationPreviewDTO.model';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.css'
})
export class ChatContainerComponent {
  protected showChat: boolean;
  protected selectedConversation: ConversationPreviewDTO;


  @Output() closeChat = new EventEmitter<unknown>();

  close(): void {
    this.showChat = false;
    this.closeChat.emit();
  }

  backToConversationsList(): void {
    this.showChat = false;
  }

  onConversationSelected($event: ConversationPreviewDTO) {
    this.selectedConversation = $event;
    this.showChat = true;
  }
}
