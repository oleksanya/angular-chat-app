import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ProfileComponent } from "../../shared/components/profile/profile.component";

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [ProfileComponent],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent implements OnInit{


  @Input() userImg!: string;
  @Input() message: any;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('one', this.message);
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
}
