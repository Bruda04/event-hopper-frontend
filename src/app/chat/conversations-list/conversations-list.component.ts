import {Component, OnInit} from '@angular/core';
import {MessageService} from '../message.service';
import {ConversationPreviewDTO} from '../../shared/dto/messages/conversationPreviewDTO.model';
import {environment} from '../../../env/envirements';

@Component({
  selector: 'app-conversations-list',
  templateUrl: './conversations-list.component.html',
  styleUrl: './conversations-list.component.css'
})
export class ConversationsListComponent implements OnInit {
  conversations: ConversationPreviewDTO[];

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.fetchConversations();
  }

  fetchConversations(): void {
    this.messageService.getConversationsPreview().subscribe({
      next: (conversations: ConversationPreviewDTO[]) => {
        this.conversations = conversations;
      },
      error: () => {
        console.error("Error fetching conversations");
      }
    });
  }

  protected readonly environment = environment;
}
