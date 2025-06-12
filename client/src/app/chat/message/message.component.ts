import { Component, input, inject, computed } from '@angular/core';
import { ProfileComponent } from '../../shared/components/profile/profile.component';
import { NgClass } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../shared/chat.interface';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [ProfileComponent, NgClass],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  userImg = input.required<string>();
  message = input.required<Message>();
  receiverImg = input.required<string>();

  private chatService = inject(ChatService);

  isFromSender = computed(() => {
    const currentUserId = localStorage.getItem('user_id');
    return this.message().senderId === currentUserId;
  });

  displayImage = computed(() => {
    return this.isFromSender() ? this.userImg() : this.receiverImg();
  });

  messageClasses = computed(() => ({
    messageFrom: !this.isFromSender(),
    messageTo: this.isFromSender(),
  }));

  messageTextClasses = computed(() => ({
    'message-text-from': !this.isFromSender(),
    'message-text-to': this.isFromSender(),
  }));

  formattedTimestamp = computed(() => {
    return this.transformTimestamp(this.message().timestamp);
  });

  private transformTimestamp(timestamp: string | Date): string {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}
