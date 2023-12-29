import type { TResponse } from '../../../../api/types';
import type { TSetChatHistoryAction } from './types';

export const setChatHistory = (
  payload: TResponse[]
): TSetChatHistoryAction => ({
  type: 'chat/history/SET',
  payload,
});
