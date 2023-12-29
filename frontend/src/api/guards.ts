import { hasOwn } from '../utils/object/hasOwn';
import { TPromptResponse } from './types';

export const guardPromptResponse = (test: unknown): test is TPromptResponse => {
  return (
    !!test &&
    hasOwn<keyof TPromptResponse>(test, 'message') &&
    hasOwn<keyof TPromptResponse>(test, 'rateLimit')
  );
};
