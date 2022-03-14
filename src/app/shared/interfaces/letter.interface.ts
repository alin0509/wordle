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
