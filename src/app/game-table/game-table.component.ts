import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { GameBoardService } from '../game-board/game-board.service';

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GameTableComponent implements OnInit {
  @HostBinding("class") class = "app-game-table";
  words$: Observable<any[]> = this.gameBoardService.wordsBoardCurrent$();
  constructor(private gameBoardService: GameBoardService) { }

  ngOnInit(): void {
  }

}
