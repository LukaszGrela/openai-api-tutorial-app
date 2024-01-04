import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  initChatAction,
  restartChatAction,
  sendPromptAction,
  sendSystemPromptAction,
} from './actions';
import type { IChatState } from './types';
import type { TResponse } from '../../../api/types';

const initialState: IChatState = {
  list: [],
  loading: false,
  initiated: false,
};

let id = 0;

export const SLICE_NAME = 'chat' as const;
export const chat = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setChatHistory(state, action: PayloadAction<TResponse[]>) {
      state.list = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(initChatAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(initChatAction.fulfilled, (state, action) => {
      state.initiated = true;
      state.error = undefined;
      state.list = action.payload.list;
      state.loading = false;
    });
    builder.addCase(initChatAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(sendPromptAction.pending, (state, action) => {
      console.log('action', action);
      state.loading = true;
      state.list.push(
        // user prompt
        { id: ++id, role: 'user', content: action.meta.arg }
      );
    });
    builder.addCase(sendPromptAction.fulfilled, (state, action) => {
      state.error = undefined;
      state.list.push(
        // chat gpt response
        {
          ...action.payload.message,
          finishReason: action.payload.finishReason,
        }
      );
      state.loading = false;
    });
    builder.addCase(sendPromptAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(restartChatAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(restartChatAction.fulfilled, (state, action) => {
      state.error = undefined;
      state.list = action.payload.list;
      state.loading = false;
    });
    builder.addCase(restartChatAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(sendSystemPromptAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sendSystemPromptAction.fulfilled, (state, action) => {
      state.error = undefined;
      state.list = action.payload.list;
      state.loading = false;
    });
    builder.addCase(sendSystemPromptAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});
