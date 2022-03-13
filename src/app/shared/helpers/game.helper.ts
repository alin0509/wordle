import { WORDS } from '../data';

export class GameHelper {
    static generateRandomWordIndex(): number {
        return Math.floor(Math.random() * (WORDS.length - 1));
    }

    static verifyWord(word: string): boolean {
        return !!WORDS.find(w => w === word);
    }
}