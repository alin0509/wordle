import { Injectable } from '@angular/core';
import { GameDefaultValues, KeyboardDefaultValues, WORDS } from '../data';
import { GameHelper } from '../helpers';
import { DailyResult, GameProgress, GameDailyProgress, GameStatistics, Letter } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class GameStateService {
    private storageName: string = 'wordleCaching';
    private gameCache: GameProgress = {} as GameProgress;
    private currentDay: string = new Date('02.02.2022').toISOString().slice(0, 10);

    constructor() {
        const storageValue = localStorage.getItem(this.storageName);
        this.gameCache = storageValue ? JSON.parse(storageValue) : { [this.currentDay]: {} } as GameProgress;
    }

    wordToFind(): string {
        const currentWordIndex = this.gameCache[this.currentDay]?.wordIndex ?? GameHelper.generateRandomWordIndex();
        this.updateCurrentWordIndexState(currentWordIndex);
        return WORDS[currentWordIndex];
    }

    keyboardValues(): Letter[] {
        return this.gameCache[this.currentDay]?.keys ?? KeyboardDefaultValues;
    }

    wordsValues(): Letter[][] {
        return this.gameCache[this.currentDay]?.words ?? GameDefaultValues;
    }

    gameStatistics(): GameStatistics {
        const statistics: GameStatistics = {};
        let gameResult = Object.keys(this.gameCache)?.map(k => this.gameCache[k]?.gameResult).filter(r => !!r);
        statistics.totalGames = gameResult?.length;
        statistics.gameWon = gameResult?.filter(r => r?.wordFound)?.length;
        statistics.gameLost = gameResult?.filter(r => !r?.wordFound)?.length;

        const tries = gameResult?.map(g => g?.tries);
        let counts: { [key: number]: number } = {};
        for (const num of tries) {
            counts[num] = counts[num] ? counts[num] + 1 : 1;
        }
        statistics.counts = counts;
        return statistics;
    }

    updateCurrentWordIndexState(index: number): void {
        if (!this.gameCache[this.currentDay]) {
            this.gameCache[this.currentDay] = {} as GameDailyProgress;
        };
        this.gameCache[this.currentDay].wordIndex = index;
        this.updateStorage();
    }
    updateWordsAndKeyboardState(words: Letter[][],keys: Letter[]): void {
        this.gameCache[this.currentDay].words = words;
        this.gameCache[this.currentDay].keys = keys;
        this.updateStorage();
    }
 
    updateResultsState(gameResult: DailyResult): void {
        this.gameCache[this.currentDay].gameResult = gameResult;
        this.updateStorage();
    }

    updateStorage(): void {
        localStorage.setItem(this.storageName, JSON.stringify(this.gameCache));
    }
}
