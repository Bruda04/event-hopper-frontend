import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {MessageService} from '../message.service';
import {ConversationPreviewDTO} from '../../shared/dto/messages/conversationPreviewDTO.model';
import {environment} from '../../../env/envirements';

@Component({
  selector: 'app-conversations-list',
  templateUrl: './conversations-list.component.html',
  styleUrl: './conversations-list.component.css'
})
export class ConversationsListComponent implements OnInit, OnDestroy {
  conversations: ConversationPreviewDTO[];

  constructor(private messageService: MessageService) {
  }

  @Output() conversationSelected = new EventEmitter<ConversationPreviewDTO>();

  ngOnInit(): void {
    this.fetchConversations();
    this.messageService.setOnMessageReceivedCallback((): void => {
      this.fetchConversations();
    });
  }

  fetchConversations(): void {
    this.messageService.getConversationsPreview().subscribe({
      next: (conversations: ConversationPreviewDTO[]): void => {
        this.conversations = conversations;
      },
      error: (): void => {
        console.error("Error fetching conversations");
      }
    });
  }

  onConversationClick(conversation: ConversationPreviewDTO): void {
    this.conversationSelected.emit(conversation);
  }

  protected readonly environment = environment;

  ngOnDestroy(): void {
    this.messageService.setOnMessageReceivedCallback(():void => {});
  }
}
