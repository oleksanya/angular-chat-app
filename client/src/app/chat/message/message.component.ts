import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ProfileComponent } from "../../shared/components/profile/profile.component";
import { NgClass } from '@angular/common';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [ProfileComponent, NgClass],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent implements OnInit{
  @Input() userImg!: string;
  @Input() message: any;
  @Input() receiverImg!: string;

  constructor(private chatService: ChatService) { }
  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log('one', this.message);
  // }

  ngOnInit(): void {
    // console.log('====== CURENT', this.currentUserImg);
    // console.log('====== SENDER', this.userImg!)
  }

  isFromSender() {
    const currentUserId = localStorage.getItem('user_id');
    return this.message.senderId === currentUserId;
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
}