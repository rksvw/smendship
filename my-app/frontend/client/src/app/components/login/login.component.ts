import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  protected email: string = '';
  protected password: string = '';
  protected errMsg: string = '';

  protected placeholder = {
    email: 'hostname@hotmail.com',
    password: '********',
  };

  constructor(private loginService: LoginService, private router: Router) {}

  onLogin() {
    this.loginService.login(this.email, this.password).subscribe({
      next: (response) => {
        const token = response.data?.login?.token;
        const userId = response.data?.login?.user?.id;

        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId);
          this.router.navigate(['/'])
        } else {
          this.errMsg = 'Invalid credentials';
        }
      },
      error: () => {
        this.errMsg = 'Login failed. Try again.';
      }
    })
  }
}
