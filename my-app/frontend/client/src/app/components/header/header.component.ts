import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHome,
  faUser,
  faUserFriends,
  faBell,
  faComment
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  // Using Unicode emoji instead of Font Awesome
  protected faHome = faHome;
  protected faUser = faUser;
  protected faUserFriends = faUserFriends;
  protected faBell = faBell;
  protected faComment = faComment;

  protected headIcons = {
    faHome: this.faHome,
    faUser: this.faUser,
    faUserFriends: this.faUserFriends,
    faBell: this.faBell,
    faComment: this.faComment
  };
}
