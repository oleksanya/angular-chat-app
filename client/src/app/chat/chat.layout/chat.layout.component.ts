import { Component,  OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { ChatListComponent } from "../chat-list/chat-list.component";
import { ChatRoomComponent } from "../chat-room/chat-room.component";
import { ChatService } from '../../services/chat.service';
import { Chat } from '../../shared/chat.interface';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-chat.layout',
  standalone: true,
  imports: [HeaderComponent, ChatListComponent, ChatRoomComponent, NgIf],
  templateUrl: './chat.layout.component.html',
  styleUrl: './chat.layout.component.scss'
})
export class ChatLayoutComponent implements OnInit, OnDestroy {
  userChats: string[] = [];
  userFriends: string[] = [];
  chatData: object[] = [];
  selectedChat: Chat | null = null;

  constructor(
    private userService: UserService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
      this.userService.getUserData().subscribe((data: any) => {
        localStorage.setItem('user_image', data.profileImage);
        localStorage.setItem('user_email', data.email);
        localStorage.setItem('user_nickname', data.username);

        this.userChats = data.chats;
        this.userFriends = data.friends;

        this.getAllChatsInfo();
      }, err => {
        console.error(err);
      });
  }

  ngOnDestroy(): void {
      localStorage.removeItem('user_profile');
  }

  async getAllChatsInfo(): Promise<any> {
    return this.chatService.getChatsData().subscribe((data) => {
      this.chatData = data;
    } );
  }

  getSelectedChat(chat: Chat): void {
    this.selectedChat = chat;
  }
}