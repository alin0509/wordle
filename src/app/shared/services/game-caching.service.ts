import { Injectable } from '@angular/core';
import { GameDefaultValues, KeyboardDefaultValues, WORDS } from '../data';
import { GameHelper } from '../helpers';
import { DayGameResult, GameCache, GameCacheValues, GameStatistics, Letter } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class GameCachingService {
    private storageName: string = 'wordleCaching';
    private gameCache: GameCache = {} as GameCache;
    private currentDay: string = new Date().toISOString().slice(0, 10);

    constructor() {
        const storageValue = localStorage.getItem(this.storageName);
        this.gameCache = storageValue ? JSON.parse(storageValue) : { [this.currentDay]: {} } as GameCache;
    }

    getWordToFind(): string {
        const currentWordIndex = this.gameCache[this.currentDay]?.wordIndex ?? GameHelper.generateRandomWordIndex();
        this.updateCurrentWordIndex(currentWordIndex);
        return WORDS[currentWordIndex];
    }

    getKeyboardValues(): Letter[] {
        return this.gameCache[this.currentDay]?.keys ?? KeyboardDefaultValues;
    }

    getWordsValues(): Letter[][] {
        return this.gameCache[this.currentDay]?.words ?? GameDefaultValues;
    }

    getGameStatistics(): GameStatistics {
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

    updateCurrentWordIndex(index: number) {
        if (!this.gameCache[this.currentDay]) {
            this.gameCache[this.currentDay] = {} as GameCacheValues;
        };
        this.gameCache[this.currentDay].wordIndex = index;
        this.updateStorage();
    }
    updateWords(words: Letter[][]) {
        this.gameCache[this.currentDay].words = words;
        this.updateStorage();
    }
    updateKeyboard(keys: Letter[]) {
        this.gameCache[this.currentDay].keys = keys;
        this.updateStorage();
    }
    updateResults(gameResult: DayGameResult) {
        this.gameCache[this.currentDay].gameResult = gameResult;
        this.updateStorage();
    }

    updateStorage() {
        localStorage.setItem(this.storageName, JSON.stringify(this.gameCache));
    }
}
