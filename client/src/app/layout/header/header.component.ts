import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() isLogged!: boolean;
  @Output() menuButtonClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() loggedOutClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}
  
  onClick(): boolean {
    this.loggedOutClicked.emit();
    return false;
  }
}
