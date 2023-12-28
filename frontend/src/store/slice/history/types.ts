import type { TResponse } from '../../../api/types';

/**
 * View history item
 */
export type THistoryActionView = {
  type: 'history/VIEW';
  payload: Date | undefined;
};
/**
 * Use history item - it will be applied to the chat context
 */
export type THistoryActionUse = {
  type: 'history/USE';
  payload: Date;
};
/**
 * Remove history item
 */
export type THistoryActionRemove = {
  type: 'history/REMOVE';
  payload: Date;
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
  current: THistoryItem | undefined;
  // is loading data
  // @deprecated
  loading?: boolean;
}
