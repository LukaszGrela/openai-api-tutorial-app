import type { THistoryItem } from '../types';
import type {
  THistoryActionView,
  THistoryActionClear,
  THistoryActionRemove,
  THistoryActionSet,
} from './types';

export const setHistory = (payload: THistoryItem): THistoryActionSet => ({
  type: 'history/SET',
  payload,
});

export const viewHistoryEntry = (
  payload: Date | undefined
): THistoryActionView => ({
  type: 'history/VIEW',
  payload,
});

export const clearHistory = (): THistoryActionClear => ({
  type: 'history/CLEAR',
});

export const removeHistoryEntry = (payload: Date): THistoryActionRemove => ({
  type: 'history/REMOVE',
  payload,
});
