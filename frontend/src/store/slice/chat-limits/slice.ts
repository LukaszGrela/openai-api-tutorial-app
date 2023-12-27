import { TSetChatLimits } from '.';
import { TLimits } from '../../../api/types';

const initialState: TLimits = {
  requestsLimit: 0,
  requestsRemaining: 0,
  tokensLimit: 0,
  tokensRemaining: 0,
  tokensUsageBasedLimit: 0,
  tokensUsageBasedRemaining: 0,
};

const slice = (state = initialState, action: TSetChatLimits): TLimits => {
  if (action.type === 'chat-limits/SET') {
    return action.payload;
  }
  return state;
};

export default slice;
