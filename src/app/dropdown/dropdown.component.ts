import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: []
})
export class DropdownComponent {
  @Output() limitSubmit = new EventEmitter<number>();
  isDropdownOpen = false;
  selectedOption: number | null = null;
  options: number[] = [4, 10, 20, 50, 100];

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectOption(option: number) {
    this.selectedOption = option;
    console.log(option);
    this.limitSubmit.emit(option);  // Emit the selected option
    this.isDropdownOpen = false;
  }
}
