import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = '';
  password = '';
  errMsg = '';

  constructor(
    private loginService: LoginService,
    private alertService: AlertService,
    private router: Router
  ) {}

  onLogin() {
    this.loginService.login(this.email, this.password).subscribe({
      next: (res) => {
        const token = res.data?.login?.token;
        if (token) {
          localStorage.setItem('token', token);
          this.router.navigate(['/']);
        } else {
          this.errMsg = 'Invalid Credentials';
        }
      },
      error: () => this.alertService.showAlert('Login failed. Try again.1'),
    });
  }
}
