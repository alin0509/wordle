import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { words } from '../game-table/game-table.data';
import { keys } from '../keyboard/keyboard.data';
import { KeyboardKey, KeyState } from '../keyboard/keyboard.interface';

@Injectable({
  providedIn: 'root'
})
export class GameBoardService {
  private currentWordValue$ = new BehaviorSubject<KeyboardKey[]>([]);

  updateCurrentWord(value: KeyboardKey[]) {
    this.currentWordValue$.next(value);
    this.updateWordsCurrent();
  }
  currentWord$(): Observable<KeyboardKey[]> {
    return this.currentWordValue$.asObservable();
  }
  currentWorld(): KeyboardKey[] {
    return this.currentWordValue$.value;
  }


  private keyBoardCurrentValue$ = new BehaviorSubject<any>(keys);
  updateKeyBoardCurrent(value: any[]) {
    this.keyBoardCurrentValue$.next(value);
  }
  keyBoardCurrent$(): Observable<any[]> {
    return this.keyBoardCurrentValue$.asObservable();
  }
  keyBoardCurrent(): any[] {
    return this.keyBoardCurrentValue$.value;
  }
  updateKeyBoardState(key: KeyboardKey, state: KeyState) {
    const keyboard = this.keyBoardCurrent()
      .map((row: KeyboardKey[]) => {
        return row.map(k => {
          if (k.value === key.value) {
            k.state = state;
          }
          return k;
        })
      });
    this.updateKeyBoardCurrent(keyboard)
  }


  currentRowIndex: number = 0;
  private wordsCurrentValue$ = new BehaviorSubject<any>(words);
  
  updateWordsCurrent() {
    const words = this.wordsBoardCurrent();
    const currentWorld = this.currentWorld();
    const word: KeyboardKey[] = words[this.currentRowIndex];
    words[this.currentRowIndex] = word.map((k, index) => {
      if (currentWorld[index]) {
        k ={ value: currentWorld[index].value, state: KeyState.Filled };  
      } else {
        k = { value: '', state: KeyState.Default };
      }
      return k;
    });

    this.wordsCurrentValue$.next(words);
  }
  wordsBoardCurrent$(): Observable<any[]> {
    return this.wordsCurrentValue$.asObservable();
  }
  wordsBoardCurrent(): any[] {
    return this.wordsCurrentValue$.value;
  }
  // updateWordsBoardState(key: string, state: KeyState) {
  //   const words = this.wordsBoardCurrent()
  //     .map((row: KeyboardKey[]) => {
  //       return row.map(k => {
  //         if (k.value === key) {
  //           k.state = state;
  //         }
  //         return k;
  //       })
  //     });
  //   // this.updateWordsCurrent(words)
  // }
}
