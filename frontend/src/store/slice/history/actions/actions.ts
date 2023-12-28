import {
  THistoryActionView,
  THistoryActionClear,
  THistoryActionRemove,
  THistoryActionSet,
  THistoryItem,
  THistoryActionUse,
} from '../types';

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
export const actionUseHistoryEntry = (payload: Date): THistoryActionUse => ({
  type: 'history/USE',
  payload,
});

export const clearHistory = (): THistoryActionClear => ({
  type: 'history/CLEAR',
});

export const removeHistoryEntry = (payload: Date): THistoryActionRemove => ({
  type: 'history/REMOVE',
  payload,
});
