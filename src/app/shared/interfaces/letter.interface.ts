import { NumberValueAccessor } from '@angular/forms';

export interface Letter {
    value?: string;
    state?: LetterState
}

export enum LetterState {
    Default = 'default',
    NotPresent = 'not-present',
    Present = 'present',
    Correct = 'correct',
    Filled = 'filled',
}

export interface GameCache {
    [key: string]: GameCacheValues;
}
export interface DayGameResult {
    wordFound: boolean;
    tries: number;
}

export interface GameCacheValues {
    words: Letter[][];
    keys: Letter[];
    wordIndex: number;
    gameResult: DayGameResult
}

export interface GameStatistics {
    totalGames?: number;
    gameWon?: number;
    gameLost?: number;
    counts?: { [key: number]: number };
}