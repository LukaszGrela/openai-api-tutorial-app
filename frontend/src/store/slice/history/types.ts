import type { TResponse } from '../../../api/types';

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
