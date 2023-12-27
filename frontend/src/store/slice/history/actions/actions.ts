import {
  THistoryActionAdd,
  THistoryActionClear,
  THistoryActionRemove,
  THistoryActionSet,
} from '../types';

export const setHistory = (): THistoryActionSet => ({
  type: 'history/SET',
});

export const addHistoryEntry = (): THistoryActionAdd => ({
  type: 'history/ADD',
});

export const clearHistory = (): THistoryActionClear => ({
  type: 'history/CLEAR',
});

export const removeHistory = (): THistoryActionRemove => ({
  type: 'history/REMOVE',
});
