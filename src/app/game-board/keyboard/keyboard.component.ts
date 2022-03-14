import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { GameBoardService, Letter } from '../../shared/index';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class KeyboardComponent {
  @HostBinding("class") class = "app-keyboard";

  keyboardRowsValues$: Observable<any[]> = this.gameBoardService.keyboardCurrentState$();

  constructor(private gameBoardService: GameBoardService) { }

  clickedKey(key: Letter): void {

    if (key.value === 'back') {
      this.gameBoardService.backKeyPressed();
      return;
    }

    if (key.value === 'enter') {
      this.gameBoardService.enterKeyPressed();
      return;
    }

    this.gameBoardService.addLetterToWord(key)
  }
}
