import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GameBoardComponent {
  @HostBinding("class") class = "app-gameBoard";
  showStatistics: boolean = false;
  showHelp: boolean = false;
}