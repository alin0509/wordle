import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { GameDefaultValues, KeyboardDefaultValues, WORDS } from '../data';
import { GameHelper } from '../helpers';
import { DayGameResult, GameCache, GameStatistics, Letter } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class GameCookieService {
    private cookieName: string = 'wordleCaching';
    private gameCache: GameCache = {} as GameCache;
    private currentDay: string = new Date().toISOString().slice(0, 10);

    constructor(private cookieService: CookieService) {
        const cookieValue = this.cookieService.get(this.cookieName);
        this.gameCache = cookieValue ? JSON.parse(cookieValue) : { [this.currentDay]: {} } as GameCache;
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
        debugger;
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
        this.gameCache[this.currentDay].wordIndex = index;
        this.cookieService.set(this.cookieName, JSON.stringify(this.gameCache), 100000);
    }
    updateWords(words: Letter[][]) {
        this.gameCache[this.currentDay].words = words;
        this.cookieService.set(this.cookieName, JSON.stringify(this.gameCache), 100000);
    }
    updateKeyboard(keys: Letter[]) {
        this.gameCache[this.currentDay].keys = keys;
        this.cookieService.set(this.cookieName, JSON.stringify(this.gameCache), 100000);
    }
    updateResults(gameResult: DayGameResult) {
        this.gameCache[this.currentDay].gameResult = gameResult;
        this.cookieService.set(this.cookieName, JSON.stringify(this.gameCache), 100000);
    } 
}