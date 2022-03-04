
export interface KeyboardKey {
    value?: string;
    state?: KeyState
}

export enum KeyState {
    Default = 'default',
    NotPresent = 'not-present',
    Present = 'present',
    Correct = 'correct',
    Filled = 'filled',
}