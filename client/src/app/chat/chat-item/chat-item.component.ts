import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ProfileComponent } from "../../shared/components/profile/profile.component";
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ChatDeleteDialogComponent } from '../chat-delete-dialog/chat-delete-dialog.component';
import { Chat } from '../../shared/chat.interface';

@Component({
  selector: 'app-chat-item',
  standalone: true,
  imports: [ProfileComponent, MatIconModule],
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

  constructor(private chatService: ChatService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.senderData = this.chatService.getSendersProfileImg(this.chat.participants[1]);
    this.senderData.subscribe((user: any) => {
      this.senderImage = user.profileImage;
      this.senderName = user.username
    });
    this.lastMessageTime = this.transformTimestamp(this.chat.lastMessage.timestamp);
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
        this.deleteChat();
      }
    });
  }

  deleteChat(): void {
    console.log('deleted chat');
  }
}
