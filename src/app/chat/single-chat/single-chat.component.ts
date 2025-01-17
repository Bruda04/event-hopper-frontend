import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {ConversationPreviewDTO} from '../../shared/dto/messages/conversationPreviewDTO.model';
import {ChatMessageDTO} from '../../shared/dto/messages/chatMessageDTO.model';
import {NewChatMessageDTO} from '../../shared/dto/messages/NewChatMessageDTO.model';
import {UserService} from '../../authentication/services/user.service';
import {MessageService} from '../message.service';
import {environment} from '../../../env/envirements';


@Component({
  selector: 'app-single-chat',
  templateUrl: './single-chat.component.html',
  styleUrls: ['./single-chat.component.css']
})
export class SingleChatComponent implements OnInit, OnDestroy {
  @Input() chatPreview!: ConversationPreviewDTO;
  chatMessages: ChatMessageDTO[] = [];
  newMessageContent: string = '';

  constructor(private messageService: MessageService,
              private userService: UserService,
              private cdr: ChangeDetectorRef
  ) { }


  sendMessage(): void {
    if (!this.newMessageContent.trim()) return;
    if (!this.userService.getUserData()?.email) return;

    const newMessage: NewChatMessageDTO = {
      sender: this.userService.getUserData()?.email,
      recipient: this.chatPreview.username,
      content: this.newMessageContent,
    };

    this.messageService.sendMessage(newMessage);

    this.newMessageContent = ''; // Clear input field
    }

  ngOnDestroy(): void {
    this.messageService.setOnMessageReceivedCallback((): void => {});
  }

  ngOnInit(): void {
    this.fetchChatMessages();
    this.messageService.setOnMessageReceivedCallback((message: ChatMessageDTO): void => {
      if (message.sender !== this.chatPreview.username && message.recipient !== this.chatPreview.username) return;

      this.chatMessages.push(message)
      if (message.sentByMe) {
        this.scrollToBottomAfterRender();
      }
    });
  }

  private fetchChatMessages(): void {
    this.messageService.getChatHistory(this.chatPreview.username).subscribe({
      next: (chatMessages: ChatMessageDTO[]): void => {
        this.chatMessages = chatMessages;
        this.scrollToBottomAfterRender();
      },
      error: (): void => {
        console.error("Error fetching chat messages");
      }
    });
  }

  @ViewChild('lastMessageAnchor') private lastMessageAnchor!: ElementRef;
  private scrollToBottom(): void {
    this.lastMessageAnchor.nativeElement.scrollIntoView({behavior: "instant", block: "end", inline: "end"});
  }

  private scrollToBottomAfterRender(): void {
    this.cdr.detectChanges(); // Ensure changes are applied
    setTimeout((): void => this.scrollToBottom(), 0); // Wait for rendering
  }

  protected readonly environment = environment;
}
