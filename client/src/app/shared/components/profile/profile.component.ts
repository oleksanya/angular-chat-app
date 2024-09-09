import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatIconModule, NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  @Input() chat!: any;
  @Input() userImg!: string;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    console.log('from app profile',this.userImg)
  }
}
