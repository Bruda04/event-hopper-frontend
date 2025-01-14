import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.css'
})
export class ChatContainerComponent {
  protected selectedConversation: boolean;

  @Output() closeChat = new EventEmitter<unknown>();

  close() {
    this.closeChat.emit();
  }

  backToConversationsList() {
    this.selectedConversation = false;
  }

}
