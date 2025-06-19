import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  AfterViewChecked,
  ViewChild,
  signal,
  inject,
  input,
  effect,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ChatService, NewMessage } from '../../core/services/chat.service';
import { Chat, Message, User } from '../../interfaces/chat.interface';
import { ProfileComponent } from '../../../components/profile/profile.component';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [ProfileComponent, MessageComponent],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss',
})
export class ChatRoomComponent
  implements OnInit, OnDestroy, AfterViewChecked, OnChanges
{
  @ViewChild('mymessage') input!: ElementRef<HTMLInputElement>;
  @ViewChild('chatBody') chatBody!: ElementRef<HTMLDivElement>;

  chat = input<Chat | null>(null);

  allMessages = signal<Message[]>([]);
  senderData = signal<User | null>(null);
  senderImage = signal<string>('');
  senderName = signal<string>('');
  userImage = signal<string>('');
  isLoading = signal<boolean>(false);
  isSending = signal<boolean>(false);
  error = signal<string | null>(null);

  private chatService = inject(ChatService);
  private destroy$ = new Subject<void>();

  constructor() {
    effect(() => {
      const currentChat = this.chat();
      if (currentChat) {
        this.handleChatChange(currentChat);
      }
    });
  }

  ngOnInit(): void {
    this.getSenderData();
    this.getUserData();
    this.subscribeToMessagesReceiving();
    this.getAllMessagesForThisChat();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const chatChange = changes['chat'];
    if (chatChange && this.chat()) {
      const currentChat = this.chat();
      if (currentChat) {
        this.chatService.joinChat(this.getChatId());
        this.getSenderData();
        this.allMessages.set([]);
        this.getAllMessagesForThisChat();
      }
    }
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.chatService.disconnectFromSocket();
  }

  private handleChatChange(chat: Chat): void {
    this.error.set(null);
    this.isLoading.set(true);
    this.chatService.joinChat(chat._id);
  }

  private getSenderData(): void {
    const currentUserId = localStorage.getItem('user_id');
    const currentChat = this.chat();

    if (!currentUserId || !currentChat) {
      this.error.set('Unable to load chat data');
      return;
    }

    const secondParticipant = currentChat.participants.find(
      (userId: string) => userId !== currentUserId
    );

    if (!secondParticipant) {
      this.error.set('Chat participant not found');
      return;
    }

    this.chatService
      .getSendersProfileImg(secondParticipant)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user: User) => {
          this.senderData.set(user);
          this.senderImage.set(user.profileImage || '');
          this.senderName.set(user.username || 'Unknown');
        },
        error: () => {
          this.error.set('Failed to load sender information');
        },
      });
  }

  private getUserData(): void {
    const currentUserId = localStorage.getItem('user_id');

    if (!currentUserId) {
      this.error.set('User not authenticated');
      return;
    }

    this.chatService
      .getSendersProfileImg(currentUserId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user: User) => {
          this.userImage.set(user.profileImage || '');
        },
        error: () => {
          this.error.set('Failed to load user information');
        },
      });
  }

  private getAllMessagesForThisChat(): void {
    const chatId = this.getChatId();

    if (!chatId || chatId === 'id') {
      this.error.set('Invalid chat ID');
      return;
    }

    this.isLoading.set(true);
    this.chatService
      .getAllMessages(chatId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.allMessages.set(response.messages || []);
          this.isLoading.set(false);
        },
        error: () => {
          this.error.set('Failed to load messages');
          this.isLoading.set(false);
        },
      });
  }

  private subscribeToMessagesReceiving(): void {
    this.chatService
      .getMessages()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (messageEvent) => {
          if (messageEvent?.newMessage) {
            this.allMessages.update((messages) => [
              ...messages,
              messageEvent.newMessage,
            ]);
          }
        },
        error: () => {
          this.error.set('Failed to receive new messages');
        },
      });
  }

  getChatId(): string {
    return this.chat()?._id || 'id';
  }

  sendMessage(): void {
    const messageContent = this.input.nativeElement.value.trim();
    const currentUserId = localStorage.getItem('user_id');

    if (!messageContent || !currentUserId) {
      return;
    }

    const chatId = this.getChatId();
    if (chatId === 'id') {
      this.error.set('Cannot send message: Invalid chat');
      return;
    }

    this.isSending.set(true);

    const newMessageMetadata: NewMessage = {
      content: messageContent,
      chatId: chatId,
      senderId: currentUserId,
    };

    try {
      this.chatService.sendMessage(newMessageMetadata);
      this.input.nativeElement.value = '';
      this.scrollToBottom();
      this.isSending.set(false);
    } catch {
      this.error.set('Failed to send message');
      this.isSending.set(false);
    }
  }

  private scrollToBottom(): void {
    if (this.chatBody?.nativeElement) {
      const chatBodyElement = this.chatBody.nativeElement;
      chatBodyElement.scrollTop = chatBodyElement.scrollHeight;
    }
  }

  clearError(): void {
    this.error.set(null);
  }
}
