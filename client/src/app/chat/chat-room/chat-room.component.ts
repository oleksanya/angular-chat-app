import { Component, Input, OnInit } from '@angular/core';
import { ProfileComponent } from "../../shared/components/profile/profile.component";
import { MessageComponent } from "../message/message.component";
import { ChatService } from '../../services/chat.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [
    NgFor,
    ProfileComponent,
    MessageComponent
    ],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss'
})
export class ChatRoomComponent implements OnInit {
  @Input() selectedChat: any;

  chat: any
  senderImage!: string;
  senderName!: string;
  allMessages: any; 

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    console.log('selectedChat', this.selectedChat.participants[1]);
    
    this.chat = this.chatService.getSendersProfileImg(this.selectedChat.participants[1]);

    this.chat.subscribe((user: any) => {
      this.senderImage = user.profileImage;
      this.senderName = user.username
    });
    let chatId = this.selectedChat._id;
    
    this.chatService.getMessages(chatId).subscribe((messages) => {
      this.allMessages = messages.messages;
    })
  }
}
