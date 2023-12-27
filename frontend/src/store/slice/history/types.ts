import type { TResponse } from '../../../api/types';

/**
 * Add history item
 */
export type THistoryActionAdd = {
  type: 'history/ADD';
};
/**
 * Remove history item
 */
export type THistoryActionRemove = {
  type: 'history/REMOVE';
};
/**
 * Set history
 */
export type THistoryActionSet = {
  type: 'history/SET';
  payload: THistoryItem;
};

/**
 * Clear history (reset)
 */
export type THistoryActionClear = {
  type: 'history/CLEAR';
};

export type THistoryItem = {
  date: Date;
  list: TResponse[];
};

export interface IHistoryState {
  // chat history
  list: THistoryItem[];
  // current chat
  current: THistoryItem;
  // is loading data
  loading?: boolean;
}
