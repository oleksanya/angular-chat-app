import { Component } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../register/register.component";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth.layout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoginComponent, RegisterComponent],
  templateUrl: './auth.layout.component.html',
  styleUrl: './auth.layout.component.scss'
})
export class AuthLayoutComponent {
  isLoginMode = true;

  toggleForm() {
    this.isLoginMode = !this.isLoginMode;
  }
}
