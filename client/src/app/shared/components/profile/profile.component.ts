import { Component, inject, input } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { Chat } from '../../chat.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  chat = input<Chat>();
  userImg = input<string>();

  userService = inject(UserService);

  constructor() {}
}
