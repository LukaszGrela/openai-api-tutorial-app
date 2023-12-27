import {
  THistoryActionAdd,
  THistoryActionClear,
  THistoryActionRemove,
  THistoryActionSet,
  THistoryItem,
} from '../types';

export const setHistory = (payload: THistoryItem): THistoryActionSet => ({
  type: 'history/SET',
  payload,
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
