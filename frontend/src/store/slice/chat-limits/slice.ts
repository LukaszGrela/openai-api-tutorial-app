import type { IChatLimitsState, TSetChatLimits, TSetChatUsage } from './types';

const initialState: IChatLimitsState = {
  limits: {
    requestsLimit: 0,
    requestsRemaining: 0,
    tokensLimit: 0,
    tokensRemaining: 0,
    tokensUsageBasedLimit: 0,
    tokensUsageBasedRemaining: 0,
  },
  usage: {
    completion_tokens: 0,
    prompt_tokens: 0,
    total_tokens: 0,
  },
};

const slice = (
  state = initialState,
  action: TSetChatLimits | TSetChatUsage
): IChatLimitsState => {
  if (action.type === 'chat-limits/SET_LIMITS') {
    return { ...state, limits: action.payload };
  }
  if (action.type === 'chat-limits/SET_USAGE') {
    return { ...state, usage: action.payload };
  }
  return state;
};

export default slice;
