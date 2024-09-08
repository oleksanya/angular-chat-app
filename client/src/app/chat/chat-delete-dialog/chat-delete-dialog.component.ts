import { Component, Inject, Input } from '@angular/core';
import { MatDialogModule, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-chat-delete-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './chat-delete-dialog.component.html',
  styleUrl: './chat-delete-dialog.component.scss'
})
export class ChatDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ChatDeleteDialogComponent>,
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
