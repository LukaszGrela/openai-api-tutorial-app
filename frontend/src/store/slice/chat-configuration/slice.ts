import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type {
  IChatConfigurationState,
  TSetChatConfigurationActionPayload,
} from './types';

const initialState: IChatConfigurationState = {
  temperature: 0,
};

export const SLICE_NAME = 'chatConfiguration' as const;
export const chatConfiguration = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setChatConfiguration(
      state,
      action: PayloadAction<TSetChatConfigurationActionPayload>
    ) {
      state[action.payload.key] = action.payload.value;
    },
  },
});
