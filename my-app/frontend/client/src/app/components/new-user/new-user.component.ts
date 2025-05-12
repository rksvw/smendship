import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  imports: [CommonModule, FormsModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.scss',
})
export class NewUserComponent {
  protected title: string = '';
  protected name: string = '';
  protected email: string = '';
  protected password: string = '';
  protected errMsg: string = '';

  protected customsType = {
    title: 'Signup',
    name: 'your name',
    email: 'hostname@hotmail.com',
    password: '********',
  };

  constructor(private newUserService: LoginService, private router: Router) {}

  onSignup() {
    this.newUserService
      .newUser(this.name, this.email, this.password)
      .subscribe({
        next: (response) => {
          const token = response.data?.signup?.token;
          const userId = response.data?.signup?.user?.id;

          if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            this.router.navigate(['/']);
          } else {
            this.errMsg = 'Invalid credentials';
          }
        },
        error: () => {
          this.errMsg = 'Create Account failed, Try again!';
        },
      });
  }
}
