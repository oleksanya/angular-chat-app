import { Component, OnDestroy, OnInit, signal, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../../core/services/user.service';
import { HeaderComponent } from '../../../components/header/header.component';
import { ChatListComponent } from '../chat-list/chat-list.component';

import { ChatService } from '../../core/services/chat.service';
import { Chat, User } from '../../interfaces/chat.interface';
import { ChatRoomComponent } from '../chat-room/chat-room.component';

@Component({
  selector: 'app-chat-layout',
  standalone: true,
  imports: [HeaderComponent, ChatListComponent, ChatRoomComponent],
  templateUrl: './chat-layout.component.html',
  styleUrl: './chat-layout.component.scss',
})
export class ChatLayoutComponent implements OnInit, OnDestroy {
  userChats = signal<string[]>([]);
  userFriends = signal<string[]>([]);
  chatData = signal<Chat[]>([]);
  selectedChat = signal<Chat | null>(null);
  currentUser = signal<User | null>(null);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  private userService = inject(UserService);
  private chatService = inject(ChatService);
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.loadUserData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    localStorage.removeItem('user_profile');
  }

  private loadUserData(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.userService
      .getUserData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (userData: User & { chats?: string[]; friends?: string[] }) => {
          this.currentUser.set(userData);
          localStorage.setItem('user_image', userData.profileImage || '');
          localStorage.setItem('user_email', userData.email);
          localStorage.setItem('user_nickname', userData.username);

          this.userChats.set(userData.chats || []);
          this.userFriends.set(userData.friends || []);

          this.getAllChatsInfo();
        },
        error: () => {
          this.error.set('Failed to load user data');
          this.isLoading.set(false);
        },
      });
  }

  private getAllChatsInfo(): void {
    console.log('Getting chats info...');
    this.chatService
      .getChatsData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log('Received chat data:', response);
          // The response is already the array of chats, not an object with a chats property
          this.chatData.set(Array.isArray(response) ? response : []);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Failed to load chats:', err);
          this.error.set('Failed to load chats');
          this.isLoading.set(false);
        },
      });
  }

  getSelectedChat(chat: Chat): void {
    this.selectedChat.set(chat);
    this.error.set(null);
  }

  handleChatDeleted(deletedChat: Chat): void {
    this.chatData.update((chats) =>
      chats.filter((chat) => chat._id !== deletedChat._id)
    );

    if (this.selectedChat()?._id === deletedChat._id) {
      this.selectedChat.set(null);
    }
  }

  clearError(): void {
    this.error.set(null);
  }
}
