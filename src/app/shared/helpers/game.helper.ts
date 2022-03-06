import { GameDefaultValues, WORDS } from '../data';

export class GameHelper {
    static generateRandomWord(): string {
        return WORDS[Math.floor(Math.random() * (GameDefaultValues.length - 1))];
    }

    static verifyWord(word: string): boolean {
        return !!WORDS.find(w => w === word);
    }
}