import { TLimits, TUsage } from '../../../api/types';

export type TSetChatLimits = {
  type: 'chat-limits/SET_LIMITS';
  payload: TLimits;
};
export type TSetChatUsage = {
  type: 'chat-limits/SET_USAGE';
  payload: TUsage;
};

export interface IChatLimitsState {
  limits: TLimits;
  usage: TUsage;
}
