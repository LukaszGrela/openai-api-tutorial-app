import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { IChatLimitsState } from './types';
import type { TLimits, TUsage } from '../../../api/types';

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

export const SLICE_NAME = 'chatLimits' as const;

export const chatLimits = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setChatLimits(state, action: PayloadAction<TLimits>) {
      state.limits = action.payload;
    },
    setChatUsage(state, action: PayloadAction<TUsage>) {
      state.usage = action.payload;
    },
  },
});
