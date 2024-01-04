import type { TError } from '../../../types';
import type { THistoryItem } from '../types';

/**
 * Use history item - it will be applied to the chat context
 */
export type THistoryActionUseStart = {
  type: 'history/USE/started';
  payload: { date: Date; useSystem?: boolean };
};
export type THistoryActionUseFinish = {
  type: 'history/USE/finished';
  payload: { data: THistoryItem; useSystem?: boolean };
};
export type THistoryActionUseFail = {
  type: 'history/USE/failed';
  payload: TError;
};
export type THistoryActionUse =
  | THistoryActionUseStart
  | THistoryActionUseFinish
  | THistoryActionUseFail;
