import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { GameDefaultValues, KeyboardDefaultValues } from '../data';
import { GameHelper } from '../helpers';
import { DailyResult, Letter, LetterState } from '../interfaces';
import { GameStateService } from './game-state.service';

@Injectable({ providedIn: 'root' })
export class GameBoardService {
  private wordToFind: string = '';
  private currentRowIndex: number = 0;

  private currentWordValue$ = new BehaviorSubject<Letter[]>([]);
  private keyboardCurrentStateValue$ = new BehaviorSubject<any>(KeyboardDefaultValues);
  private wordsArrayCurrentValue$ = new BehaviorSubject<any>(GameDefaultValues);

  constructor(private toastr: ToastrService, private gameStateService: GameStateService) {
    this.wordToFind = this.gameStateService.wordToFind();
    this.wordsArrayCurrentValue$.next(this.gameStateService.wordsValues());
    this.keyboardCurrentStateValue$.next(this.gameStateService.keyboardValues());
    this.getCurrentRowIndex();
    this.testIfWordAlreadyFound();
  }

  updateCurrentWord(value: Letter[]) {
    this.currentWordValue$.next(value);
    this.updateWordsArrayCurrentValues();
  }
  currentWord(): Letter[] {
    return this.currentWordValue$.value;
  }
  resetCurrentWord(): void {
    this.currentWordValue$.next([]);
  }

  updateKeyboardCurrentState(value: any[]) {
    this.keyboardCurrentStateValue$.next(value);
  }
  keyboardCurrentState$(): Observable<any[]> {
    return this.keyboardCurrentStateValue$.asObservable();
  }
  keyboardCurrentState(): any[] {
    return this.keyboardCurrentStateValue$.value;
  }
  updateKeyboardLetterState(key: Letter, state: LetterState): void {
    const keyboard = this.keyboardCurrentState()
      .map((row: Letter[]) => {
        return row.map(k => {
          if (k.value === key.value) {
            if (k.state !== LetterState.Correct && state !== LetterState.Default) {
              k.state = state;
            }
          }
          return k;
        })
      });
    this.updateKeyboardCurrentState(keyboard)
  }

  updateWordsArrayCurrentValues(): void {
    if (this.currentRowIndex > 5) {
      return;
    }
    const wordsArray = this.wordsArrayCurrentValues();
    const currentWorld = this.currentWord();
    // update wordsArray with values entered from keyboard (currentWord)
    wordsArray[this.currentRowIndex] = wordsArray[this.currentRowIndex]
      .map((k, index) => ({
        value: currentWorld[index] ? currentWorld[index].value : '',
        state: currentWorld[index] ? LetterState.Filled : LetterState.Default
      }));

    this.wordsArrayCurrentValue$.next(wordsArray);
  }
  wordsArrayCurrentValues$(): Observable<any[]> {
    return this.wordsArrayCurrentValue$.asObservable();
  }
  wordsArrayCurrentValues(): Letter[][] {
    return this.wordsArrayCurrentValue$.value;
  }
  testTheWord(): void {
    this.updateWordsArrayLetterStatus();
    this.updateKeyboardStatus();
    this.updateStateValues();
    if (this.testIfWordWasFound()) {
      this.youWin();
      return;
    } else {
      this.currentRowIndex = this.currentRowIndex + 1;
      this.resetCurrentWord();
    }
    if (this.currentRowIndex > 5) {
      this.gameOver();
    }
  }
  backKeyPressed(): void {
    let currentWord: Letter[] = this.currentWord();
    if (currentWord.length) {
      const el = currentWord.pop();
      this.updateCurrentWord(currentWord);
      this.updateKeyboardLetterState(el ?? {} as Letter, LetterState.Default);
    }
  }
  enterKeyPressed(): void {
    let currentWord: Letter[] = this.currentWord();
    if (currentWord.length === 5) {
      let currentWord: Letter[] = this.currentWord();
      if (GameHelper.verifyWord(currentWord.map(k => k.value).join(''))) {
        this.testTheWord();
        currentWord = [];
      } else {
        this.toastr.error("Not a valid word.")
      }
    }
  }
  addLetterToWord(key: Letter): void {
    let currentWord: Letter[] = this.currentWord();
    if (currentWord.length === 5) {
      return;
    }
    currentWord.push(key);
    this.updateCurrentWord(currentWord);
  }

  private updateStateValues(): void {
    this.gameStateService.updateWordsAndKeyboardState(this.wordsArrayCurrentValues(), this.keyboardCurrentState());
  }

  private getCurrentRowIndex(): void {
    this.currentRowIndex = -1;
    const wordsArray = this.wordsArrayCurrentValues();
    wordsArray.forEach((w, index) => {
      if (w[0].value !== '') {
        this.currentRowIndex = index;
      }
    });
    this.currentRowIndex = this.currentRowIndex + 1;
  }

  private testIfWordAlreadyFound(): void {
    const wordsArray = this.wordsArrayCurrentValues();
    if (this.currentRowIndex !== 0) {
      if (wordsArray[this.currentRowIndex - 1].every((w: Letter) => { return w.state === LetterState.Correct })) {
        this.toastr.success('Already solved!');
      } else if (this.currentRowIndex === 6) {
        this.toastr.info('Already played this game!');
      }
    }
  }

  private updateKeyboardStatus(): void {
    const wordsArray = this.wordsArrayCurrentValues();
    wordsArray[this.currentRowIndex].forEach(k => this.updateKeyboardLetterState(k, k?.state ?? LetterState.Default));
  }

  private updateWordsArrayLetterStatus(): void {
    const wordsArray = this.wordsArrayCurrentValues();
    wordsArray[this.currentRowIndex] = wordsArray[this.currentRowIndex]
      .map((k, index) => {
        if (k.value === this.wordToFind[index]) { // Letter is in the correct position
          k.state = LetterState.Correct;
        } else if (this.wordToFind.includes(k?.value ?? '')) { // Letter is present but in wrong position
          k.state = LetterState.Present;
        } else { // Letter not present in the word
          k.state = LetterState.NotPresent;
        }
        return k;
      });
  }

  private testIfWordWasFound(): boolean {
    return this.currentWord().map(l => l.value).join('') === this.wordToFind
  }

  private gameOver(): void {
    this.toastr.info('Game Over! The word was ' + this.wordToFind.toUpperCase());
    const result: DailyResult = { wordFound: false, tries: this.currentRowIndex + 1 };
    this.gameStateService.updateResultsState(result);
  }

  private youWin(): void {
    this.toastr.success('You win!');
    const result: DailyResult = { wordFound: true, tries: this.currentRowIndex + 1 };
    this.gameStateService.updateResultsState(result);
    this.currentRowIndex = 6;
  }
}
