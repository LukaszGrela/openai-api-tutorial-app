import { TLimits } from '../../../api/types';

export type TSetChatLimits = {
  type: 'chat-limits/SET';
  payload: TLimits;
};
