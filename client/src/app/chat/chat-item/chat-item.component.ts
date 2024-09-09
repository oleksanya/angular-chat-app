import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ProfileComponent } from "../../shared/components/profile/profile.component";
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ChatDeleteDialogComponent } from '../chat-delete-dialog/chat-delete-dialog.component';
import { Chat } from '../../shared/chat.interface';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-chat-item',
  standalone: true,
  imports: [ProfileComponent, MatIconModule, NgIf],
  templateUrl: './chat-item.component.html',
  styleUrl: './chat-item.component.scss'
})
export class ChatItemComponent implements OnInit {
  @Input() chat: any;
  @Output() chatSelected = new EventEmitter<Chat>();
  
  senderData: any;
  senderImage: string = '';
  senderName: string = '';
  lastMessageTime: any;
  lastMessage: any | null = null;

  constructor(private chatService: ChatService, public dialog: MatDialog) {}

  ngOnInit(): void {
    const currentUserId = localStorage.getItem('user_id');
    const secondParticipant = this.chat.participants.find((userId: any) => userId !== currentUserId);
    this.senderData = this.chatService.getSendersProfileImg(secondParticipant);
    this.senderData.subscribe((user: any) => {
      this.senderImage = user.profileImage;
      this.senderName = user.username
      this.lastMessage = this.chat.lastMessage;

      this.chatService.getMessages(this.senderData.chatId).subscribe((message: any) => {

        if (this.chat._id === message.chatId) {
          this.lastMessage = message.newMessage;
          this.lastMessageTime = this.transformTimestamp(message.newMessage.timestamp);
        }
      });
    });
    this.lastMessageTime = this.chat.lastMessage ? this.transformTimestamp(this.chat.lastMessage.timestamp) : '';
  }

  transformTimestamp(timestamp: string | Date): string {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }  

  openDeleteDialog(event: any): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(ChatDeleteDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteChat(this.chat._id);
      }
    });
  }

  deleteChat(chatId: string): void {
    this.chatService.deleteChat(chatId).subscribe(() => {
      console.log('Chat deleted');
    });
  }
}