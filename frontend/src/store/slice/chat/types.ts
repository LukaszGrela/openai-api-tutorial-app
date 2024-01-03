import type { TResponse } from '../../../api/types';
import { TError } from '../../types';

export interface IChatState {
  loading?: boolean;
  list: TResponse[];
  initiated: boolean;
  error?: TError;
}
