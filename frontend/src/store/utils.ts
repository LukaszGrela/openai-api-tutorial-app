import { hasOwn } from '../utils/object/hasOwn';
import type { THistoryResponse } from './types';

export const guardTHistoryResponse = (
  test: unknown
): test is THistoryResponse => {
  return !!test && hasOwn(test, 'list') && hasOwn(test, 'rateLimit');
};
