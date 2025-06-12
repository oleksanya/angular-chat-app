import {
  Component,
  OnInit,
  signal,
  inject,
  OnDestroy,
  input,
  output,
} from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ProfileComponent } from '../../../components/profile/profile.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ChatDeleteDialogComponent } from '../chat-delete-dialog/chat-delete-dialog.component';
import {
  Chat,
  User,
  Message,
  NewMessageEvent,
} from '../../interfaces/chat.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-item',
  standalone: true,
  imports: [ProfileComponent, MatIconModule],
  templateUrl: './chat-item.component.html',
  styleUrl: './chat-item.component.scss',
})
export class ChatItemComponent implements OnInit, OnDestroy {
  chat = input.required<Chat>();
  chatSelected = output<Chat>();
  chatDeleted = output<string>();

  senderData = signal<User | null>(null);
  senderImage = signal<string>('');
  senderName = signal<string>('');
  lastMessageTime = signal<string>('');
  lastMessage = signal<Message | null>(null);
  isLoading = signal<boolean>(false);
  isDeleting = signal<boolean>(false);

  private chatService = inject(ChatService);
  private dialog = inject(MatDialog);

  private subscriptions = new Subscription();

  ngOnInit(): void {
    this.initializeChatData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initializeChatData(): void {
    const currentUserId = localStorage.getItem('user_id');
    if (!currentUserId) {
      return;
    }

    const secondParticipant = this.chat().participants.find(
      (userId: string) => userId !== currentUserId
    );

    if (!secondParticipant) {
      return;
    }

    this.isLoading.set(true);

    const senderProfileSub = this.chatService
      .getSendersProfileImg(secondParticipant)
      .subscribe({
        next: (user: User) => {
          this.senderData.set(user);
          this.senderImage.set(user.profileImage || '');
          this.senderName.set(user.username || 'Unknown User');
          this.lastMessage.set(this.chat().lastMessage);
          this.isLoading.set(false);

          this.subscribeToMessages();
        },
        error: () => {
          this.isLoading.set(false);
        },
      });

    this.subscriptions.add(senderProfileSub);

    const lastMessage = this.chat().lastMessage;
    this.lastMessageTime.set(
      lastMessage?.timestamp
        ? this.transformTimestamp(lastMessage.timestamp)
        : ''
    );
  }

  private subscribeToMessages(): void {
    const messagesSub = this.chatService
      .getMessages(this.chat()._id)
      .subscribe({
        next: (messageEvent: NewMessageEvent) => {
          if (this.chat()._id === messageEvent.chatId) {
            this.lastMessage.set(messageEvent.newMessage);
            this.lastMessageTime.set(
              this.transformTimestamp(messageEvent.newMessage.timestamp)
            );
          }
        },
        error: () => {},
      });

    this.subscriptions.add(messagesSub);
  }

  transformTimestamp(timestamp: string | Date): string {
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) {
        return '';
      }
      return date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return '';
    }
  }

  onChatSelect(): void {
    this.chatSelected.emit(this.chat());
  }

  openDeleteDialog(event: Event): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(ChatDeleteDialogComponent, {
      width: '250px',
      data: { chatId: this.chat()._id, chatName: this.senderName() },
    });

    const dialogSub = dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {
        if (result) {
          this.deleteChat(this.chat()._id);
        }
      },
    });

    this.subscriptions.add(dialogSub);
  }

  private deleteChat(chatId: string): void {
    this.isDeleting.set(true);

    const deleteSub = this.chatService.deleteChat(chatId).subscribe({
      next: () => {
        this.isDeleting.set(false);
        this.chatDeleted.emit(chatId);
      },
      error: () => {
        this.isDeleting.set(false);
      },
    });

    this.subscriptions.add(deleteSub);
  }

  // Getters for template access to signals
  get sender(): User | null {
    return this.senderData();
  }

  get senderImageUrl(): string {
    return this.senderImage();
  }

  get senderDisplayName(): string {
    return this.senderName();
  }

  get displayLastMessage(): Message | null {
    return this.lastMessage();
  }

  get displayLastMessageTime(): string {
    return this.lastMessageTime();
  }

  get loading(): boolean {
    return this.isLoading();
  }

  get deleting(): boolean {
    return this.isDeleting();
  }
}
