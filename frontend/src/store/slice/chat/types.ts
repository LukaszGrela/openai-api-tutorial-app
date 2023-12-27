import type { TResponse } from '../../../api/types';

export interface IChatState {
  loading?: boolean;
  list: TResponse[];
  initiated: boolean;
}
