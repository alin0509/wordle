import { Component, EventEmitter, HostBinding, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-game-help',
  templateUrl: './game-help.component.html',
  styleUrls: ['./game-help.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GameHelpComponent {
  @HostBinding("class") class = "app-gameHelp";

  @Output() closeHelpEvent = new EventEmitter<boolean>();
  
  closeHelp() {
    this.closeHelpEvent.emit(true);
  }
}
