import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignupService } from '../../services/signup.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';

  constructor(
    private signupService: SignupService,
    private aleartService: AlertService,
    private router: Router
  ) {}

  onSignup() {
    this.signupService.signUp(this.name, this.email, this.password).subscribe({
      next: (res) => {
        const token = res.data?.signup?.token;
        if (token) {
          localStorage.setItem('token', token);
          this.router.navigate(['/']);
        } else {
          this.aleartService.showAlert('Invalid Credentials');
        }
      },
      error: () => this.aleartService.showAlert('Error'),
    });
  }
}
