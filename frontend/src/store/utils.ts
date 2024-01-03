import type { THistoryResponse } from '../api/types';
import { hasOwn } from '../utils/object/hasOwn';
import { TError } from './types';

export const guardTHistoryResponse = (
  test: unknown
): test is THistoryResponse => {
  return !!test && hasOwn(test, 'list') && hasOwn(test, 'rateLimit');
};

export const toError = (error: unknown): TError => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  name: (error as Error).name || (error as any).type,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  code: (error as any).code,
  message: (error as Error).message,
  stack: (error as Error).stack,
});
