import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { GameBoardService } from '../game-board/game-board.service';
import { KeyboardKey, KeyState } from './keyboard.interface';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class KeyboardComponent implements OnInit {
  @HostBinding("class") class = "app-keyboard";
  keys$: Observable<any[]> = this.gameBoardService.keyBoardCurrent$();
  currentWord: KeyboardKey[] = [];

  constructor(private gameBoardService: GameBoardService) { }

  ngOnInit(): void { }

  clickedKey(key: KeyboardKey) {

    if (key.value === 'back') {
      if (this.currentWord.length) {
        const el = this.currentWord.pop();
        this.gameBoardService.updateCurrentWord(this.currentWord);
        this.gameBoardService.updateKeyBoardState(el ?? {} as KeyboardKey, KeyState.Default);
      }
      return;
    }

    if (this.currentWord.length === 5) {
      if (key.value === 'enter') {
        console.log('test the world');
        if (this.gameBoardService.verifyWord(this.currentWord.map(k => k.value).join(''))) {
          this.gameBoardService.testTheWord();
          this.currentWord = [];
        } else {
          alert('Not a valid word!');
        }
      }
      return;
    }
    if (key.value === 'enter') {
      return;
    }
    this.currentWord.push(key);
    this.gameBoardService.updateCurrentWord(this.currentWord);
  }
}
