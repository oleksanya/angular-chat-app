import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup<{
    username: FormControl<string | null>;
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  onRegister() {
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const { username, email, password } = this.registerForm.value;

    this.authService
      .register(username || '', email || '', password || '')
      .subscribe({
        next: (success) => {
          this.isLoading.set(false);
          if (!success) {
            this.errorMessage.set('Registration failed. Please try again.');
          }
        },
        error: () => {
          this.isLoading.set(false);
          this.errorMessage.set('Registration failed. Please try again.');
        },
      });
  }
}
