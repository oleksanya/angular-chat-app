import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChatService, NewMessage } from '../../services/chat.service';
import { Chat } from '../../shared/chat.interface';
import { ProfileComponent } from '../../shared/components/profile/profile.component';
import { MessageComponent } from '../message/message.component';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [ProfileComponent, MessageComponent, NgForOf],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss'
})
export class ChatRoomComponent implements OnInit, OnChanges {
  @ViewChild('mymessage') input: any;
  @ViewChild('chatBody') chatBody!: ElementRef;

  @Input() chat: any;
  selectedChat: any;
  allMessages: any;
  senderImage!: string;
  senderName!: string;
  userImage!: string; 

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.getSenderData();
    this.getUserData();
    this.subscribeToMessagesReceiving();
    this.getAllMessagesForThisChat();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chat) {
      this.chatService.joinChat(this.getChatId());
    }

    if (changes['chat'] && this.chat) {
      this.getSenderData();
      this.allMessages = [];
      this.getAllMessagesForThisChat();
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  getSenderData() {
    const currentUserId = localStorage.getItem('user_id');
    const secondParticipant = this.chat.participants.find((userId: any) => userId !== currentUserId);
    
    this.selectedChat = this.chatService.getSendersProfileImg(secondParticipant);
    this.selectedChat.subscribe((user: any) => {
      this.senderImage = user.profileImage;
      this.senderName = user.username
    });
  }

  getUserData() {
    const currentUserId = localStorage.getItem('user_id')!;
    this.selectedChat = this.chatService.getSendersProfileImg(currentUserId);
    this.selectedChat.subscribe((user: any) => {
      this.userImage = user.profileImage;
    });
  }

  getAllMessagesForThisChat() {
    const chatId = this.getChatId();

    this.chatService.getAllMessages(chatId).subscribe((messages) => {
      this.allMessages = messages.messages;
    });
  }
  
  subscribeToMessagesReceiving() {
    this.chatService.getMessages().subscribe((message: any) => {
      this.allMessages.push(message.newMessage);
    });
  }

  getChatId(): string {
    return this.chat?._id || 'id';
  }
 
  sendMessage() {
    const newMessageMetadata: NewMessage = {
      content: this.input.nativeElement.value,
      chatId: this.getChatId(),
      senderId: localStorage.getItem('user_id')!
    }

    this.chatService.sendMessage(newMessageMetadata);
    this.scrollToBottom();
    this.input.nativeElement.value = '';
  }

  scrollToBottom(): void {
    const chatBodyElement = this.chatBody.nativeElement;
    chatBodyElement.scrollTop = chatBodyElement.scrollHeight;
  }
}