import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private router = inject(Router);

  isLoggingOut = signal<boolean>(false);

  logOut(): void {
    this.isLoggingOut.set(true);

    try {
      localStorage.clear();
      this.router.navigate(['/auth']);
    } catch {
      console.error('Error during logout');
    } finally {
      this.isLoggingOut.set(false);
    }
  }
}
