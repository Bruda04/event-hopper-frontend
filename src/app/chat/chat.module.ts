import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../infrastructure/material/material.module';
import { ChatContainerComponent } from './chat-container/chat-container.component';
import { ConversationsListComponent } from './conversations-list/conversations-list.component';
import { SingleChatComponent } from './single-chat/single-chat.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ChatContainerComponent,
    ConversationsListComponent,
    SingleChatComponent
  ],
  exports: [
    ChatContainerComponent
  ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule
    ]
})
export class ChatModule { }
