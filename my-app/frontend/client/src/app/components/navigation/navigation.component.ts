import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHome,
  faUser,
  faUserFriends,
  faBell,
  faGlobe,
  faSearch,
  faComment,
  faSquarePlus
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  // Using Unicode emoji instead of Font Awesome
  protected faHome = faHome;
  protected faUser = faUser;
  protected faUserFriends = faUserFriends;
  protected faBell = faBell;
  protected faComment = faComment;
  protected faSearch = faSearch;
  protected faGlobe = faGlobe;
  protected faSquarePlus = faSquarePlus;

  protected headIcons = {
    faHome: this.faHome,
    faUser: this.faUser,
    faSearch: this.faSearch,
    faSquarePlus: this.faSquarePlus,
    faGlobe: this.faGlobe,
    faUserFriends: this.faUserFriends,
    faBell: this.faBell,
    faComment: this.faComment,
  };
}
