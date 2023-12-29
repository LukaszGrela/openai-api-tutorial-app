import type { TLimits, TUsage } from '../../../api/types';
import type { TSetChatLimits, TSetChatUsage } from './types';

export const setChatLimits = (payload: TLimits): TSetChatLimits => ({
  type: 'chat-limits/SET_LIMITS',
  payload,
});

export const setChatUsage = (payload: TUsage): TSetChatUsage => ({
  type: 'chat-limits/SET_USAGE',
  payload,
});
