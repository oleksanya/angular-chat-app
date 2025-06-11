import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ChatItemComponent } from "../chat-item/chat-item.component";
import { Chat } from '../../shared/chat.interface';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [NgFor, ChatItemComponent],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss'
})
export class ChatListComponent implements OnInit{
  @Input() chats: any;
  @Input() sendersImg!: string;

  @Output() onChatSelect = new EventEmitter<Chat>();
  
  allUsers: any | undefined;

  constructor() { }
  ngOnInit(): void {

  }

  clickOnChat(chat: Chat): void {
    this.onChatSelect.emit(chat);
  }
 
}
