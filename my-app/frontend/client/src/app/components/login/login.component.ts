import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  protected email: string = "";
  protected password: string = "";
  protected errMsg: string = "";

 placeholder = {
    email :"example@email.com",
    password: "********",
  };

  constructor() {}

  onLogin() {

    console.log(this.password);
    console.log(this.email);
  }
}
