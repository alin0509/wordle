import { Letter } from './letter.interface';

export interface DailyResult {
    wordFound: boolean;
    tries: number;
}

export interface GameDailyProgress {
    words: Letter[][];
    keys: Letter[];
    wordIndex: number;
    gameResult: DailyResult
}

export interface GameProgress {
    [key: string]: GameDailyProgress;
}

export interface GameStatistics {
    totalGames?: number;
    gameWon?: number;
    gameLost?: number;
    counts?: { [key: number]: number };
}