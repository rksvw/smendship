import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [ CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isDropdownOpen: Boolean = false;
  options: string[] = ['Option 1', 'Option 2', 'Option 3'];
  selectedOption: string | null = null;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen; // * Work like a button 1-click : on , another-click : off
  }

  onSelect(option: string) {
    this.isDropdownOpen = false;
  }



  selectOption(option: string) {
    this.selectedOption = option;
    // this.isDropdownOpen = false;
  }
}
