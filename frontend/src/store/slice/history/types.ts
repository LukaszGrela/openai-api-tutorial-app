import type { TResponse, TUsage } from '../../../api/types';

export type THistoryItem = {
  // time value in milliseconds since midnight, January 1, 1970 UTC.
  date: number;
  list: TResponse[];
  usage: TUsage;
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
