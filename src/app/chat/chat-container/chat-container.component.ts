import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConversationPreviewDTO} from '../../shared/dto/messages/conversationPreviewDTO.model';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.css'
})
export class ChatContainerComponent implements OnInit {
  protected showChat: boolean;
  protected selectedConversation: ConversationPreviewDTO;


  @Output() closeChat = new EventEmitter<unknown>();
  @Input() conversation: ConversationPreviewDTO;

  ngOnInit(): void {
    if (this.conversation) {
      this.selectedConversation = this.conversation;
      this.showChat = true;
    } else {
      this.showChat = false;
    }
  }

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
