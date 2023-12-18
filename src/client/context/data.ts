import { Dispatch, createContext } from 'react';

export type State = Record<string, number> | null;
export type Action =
    | {
          type: 'init';
          state: State;
      }
    | { type: 'set'; key: string; value: number };

export const dataContext = createContext<State | null>(null);
export const dataDispatchContext = createContext<Dispatch<Action> | null>(null);
