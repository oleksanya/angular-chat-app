import { NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ProfileComponent } from "../../shared/components/profile/profile.component";
import { ChatItemComponent } from "../chat-item/chat-item.component";

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [NgFor, ProfileComponent, ChatItemComponent],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss'
})
export class ChatListComponent implements OnInit{
  @Input() chats: any[] = [];
  @Input() sendersImg!: string;
  
  allUsers: any | undefined;

  constructor() { }
  ngOnInit(): void {
    // console.log(this.chats);
  }


  // async ngOnInit(): Promise<any> {
  //   this.allUsers = await this.getUsers();
  // }

  // async getUsers() {
  //   return await this.dbService.getAllUsers();
  // }

  // catchEvent(ev: any): void {
  //   this.chatData.onDataReceived(ev);
  // }

}
