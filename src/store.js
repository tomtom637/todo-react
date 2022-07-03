import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// SET THE INITIAL VALUE OF OUR LOCAL STORAGE LISTS OF TODOS
export const todosAtom = atomWithStorage('todos', []);

// GLOBAL STATES
export const displayModalAtom = atom(false);

export const cardIndexAtom = atom(null);

export const focusedTitleAtom = atom(null);

export const focusedTaskAtom = atom(null);

export const stopDisplayingModalAtom = atom(false);