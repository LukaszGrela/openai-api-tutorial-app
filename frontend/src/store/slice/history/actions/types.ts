import type { TError } from '../../../types';
import type { THistoryItem } from '../types';

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
export type THistoryActionUseStart = {
  type: 'history/USE/started';
  payload: Date;
};
export type THistoryActionUseFinish = {
  type: 'history/USE/finished';
  payload: THistoryItem;
};
export type THistoryActionUseFail = {
  type: 'history/USE/failed';
  payload: TError;
};
export type THistoryActionUse =
  | THistoryActionUseStart
  | THistoryActionUseFinish
  | THistoryActionUseFail;

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
