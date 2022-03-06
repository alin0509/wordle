import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { GameBoardService } from '../../shared/index';

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GameTableComponent {
  @HostBinding("class") class = "app-game-table";

  words$: Observable<any[]> = this.gameBoardService.wordsArrayCurrentValues$();

  constructor(private gameBoardService: GameBoardService) { }
}
