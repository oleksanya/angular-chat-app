import { Component, input, output } from '@angular/core';
import { ChatItemComponent } from '../chat-item/chat-item.component';
import { Chat } from '../../shared/chat.interface';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [ChatItemComponent],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss',
})
export class ChatListComponent {
  chats = input<Chat[]>();
  sendersImg = input<string>();
  onChatSelect = output<Chat>();

  allUsers: unknown | undefined;

  clickOnChat(chat: Chat): void {
    this.onChatSelect.emit(chat);
  }
}
