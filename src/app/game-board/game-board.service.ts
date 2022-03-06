import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { words } from '../game-table/game-table.data';
import { keys } from '../keyboard/keyboard.data';
import { KeyboardKey, KeyState } from '../keyboard/keyboard.interface';
import { WORDS } from './words.data';

@Injectable({
  providedIn: 'root'
})
export class GameBoardService {
  private wordToFind: string = 'qwerty';
  currentRowIndex: number = 0;

  private currentWordValue$ = new BehaviorSubject<KeyboardKey[]>([]);
  private keyBoardCurrentValue$ = new BehaviorSubject<any>(keys);
  private wordsCurrentValue$ = new BehaviorSubject<any>(words);

  constructor(private cookieService: CookieService) {
    let gameWon: boolean = false;
    this.currentRowIndex = 0;
    this.wordToFind = this.cookieService.get('word');
    if (this.wordToFind === '') {
      this.generateNewWord();
    };

    const wordsCookie: string = this.cookieService.get('words');
    if (wordsCookie === '') {
      this.wordsCurrentValue$.next(words);
    } else {
      const wordsCookieArr: any[] = JSON.parse(wordsCookie)
      wordsCookieArr.forEach((w, index) => {
        if (w[0].value !== '') {
          this.currentRowIndex = index;
        }
      });
      if (wordsCookieArr[this.currentRowIndex].every((w: KeyboardKey) => { return w.state === KeyState.Correct })) {
        gameWon = true;
      }
      this.currentRowIndex = this.currentRowIndex + 1;
      this.wordsCurrentValue$.next(wordsCookieArr);
    }
    const keysCookie = this.cookieService.get('keys');
    this.keyBoardCurrentValue$.next(keysCookie !== '' ? JSON.parse(keysCookie) : keys);
    if (gameWon) {
      setTimeout(() => {
        alert('You win!');
        this.currentRowIndex = 6;
      }, 100);
    }
  }

  updateCurrentWord(value: KeyboardKey[]) {
    this.currentWordValue$.next(value);
    this.updateWordsCurrent();
  }
  currentWord$(): Observable<KeyboardKey[]> {
    return this.currentWordValue$.asObservable();
  }
  currentWord(): KeyboardKey[] {
    return this.currentWordValue$.value;
  }
  resetCurrentWord() {
    this.currentWordValue$.next([]);
  }


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
            if (k.state !== KeyState.Correct && state != KeyState.Default) {
              k.state = state;
            }
          }
          return k;
        })
      });
    this.updateKeyBoardCurrent(keyboard)
  }


  updateWordsCurrent() {
    if (this.currentRowIndex > 5) {
      return;
    }
    const words = this.wordsBoardCurrent();
    const currentWorld = this.currentWord();
    const word: KeyboardKey[] = words[this.currentRowIndex];
    words[this.currentRowIndex] = word.map((k, index) => {
      if (currentWorld[index]) {
        k = { value: currentWorld[index].value, state: KeyState.Filled };
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
  wordsBoardCurrent(): KeyboardKey[][] {
    return this.wordsCurrentValue$.value;
  }
  testTheWord() {
    const words = this.wordsBoardCurrent();
    const word: KeyboardKey[] = words[this.currentRowIndex];
    words[this.currentRowIndex] = word.map((k, index) => {
      const foundIndex: number = this.wordToFind.indexOf(k?.value ?? '');
      if (k.value === this.wordToFind[index]) {
        k.state = KeyState.Correct;
      } else if (foundIndex !== -1) {
        k.state = KeyState.Present;
      } else {
        k.state = KeyState.NotPresent;
      }
      return k;
    });
    words[this.currentRowIndex].forEach(k => this.updateKeyBoardState(k, k?.state ?? KeyState.Default));

    this.updateCookiesValues();

    if (!words[this.currentRowIndex].some(k => (k.state === KeyState.NotPresent || k.state === KeyState.Present))) {
      setTimeout(() => {
        alert('You win!');
        this.currentRowIndex = 6;
      }, 0);
      return;
    } else {
      this.currentRowIndex = this.currentRowIndex + 1;
      this.resetCurrentWord();
    }
    if (this.currentRowIndex > 5) {
      setTimeout(() => alert('Game Over! The word was ' + this.wordToFind), 0);
    }
  }

  updateCookiesValues() {
    this.cookieService.set('words', JSON.stringify(this.wordsBoardCurrent()));
    this.cookieService.set('keys', JSON.stringify(this.keyBoardCurrent()));
  }
  generateNewWord() {
    this.wordToFind = this.generateRandomWord();
    this.cookieService.set('word', this.wordToFind);
  }
  generateRandomWord() {
    return WORDS[Math.floor(Math.random() * (words.length - 1))];
  }

  verifyWord(word: string) {
    return WORDS.find(w => w === word);
  }
}
