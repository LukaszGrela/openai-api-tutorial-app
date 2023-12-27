import type { TResponse } from '../../types';

export interface IChatState {
  loading?: boolean;
  list: TResponse[];
}
