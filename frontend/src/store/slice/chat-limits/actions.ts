import type { TLimits } from '../../../api/types';
import type { TSetChatLimits } from './types';

export const setChatLimits = (payload: TLimits): TSetChatLimits => ({
  type: 'chat-limits/SET',
  payload,
});
