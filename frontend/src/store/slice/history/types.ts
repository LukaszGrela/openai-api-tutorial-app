import { hasOwn } from '../../../utils/object/hasOwn';
import { TLimits } from '../../types';

export type THistoryActionAdd = {
  type: 'history/ADD';
};
export type THistoryActionRemove = {
  type: 'history/REMOVE';
};
export type THistoryActionSet = {
  type: 'history/SET';
};
export type THistoryActionClear = {
  type: 'history/CLEAR';
};

export type THistoryActionInitStart = {
  type: 'history/INIT/start';
};
export type THistoryActionInitFinish = {
  type: 'history/INIT/finish';
  payload: THistoryResponse;
};
export type THistoryActionInitFail = {
  type: 'history/INIT/fail';
  payload: { name: string; message: string; stack?: string };
};

export type THistoryResponse = {
  list: TResponse[];
  rateLimit: TLimits;
};
export const guardTHistoryResponse = (
  test: unknown
): test is THistoryResponse => {
  return !!test && hasOwn(test, 'list') && hasOwn(test, 'rateLimit');
};

export type TResponse = { id: string | number; role: string; content: string };

export type THistoryItem = {
  date: Date;
  list: TResponse[];
};

export interface IHistoryState {
  list: THistoryItem[];
  current: number;

  loading?: boolean;
}
