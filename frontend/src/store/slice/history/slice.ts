import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { localHistoryStorage } from '../../../utils/localHistoryStorage';
import type { IHistoryState, THistoryItem } from './types';
import { initChatWithHistory } from '.';

const initialState: IHistoryState = {
  current: undefined,
  list: [],
  loading: false,
};

// load from localstorage
try {
  const list = localHistoryStorage.getObject<THistoryItem[]>('historyList');
  initialState.list =
    list?.map((localData) => ({
      ...localData,
      date: new Date(localData.date).getTime(),
    })) || [];
} catch (error) {
  console.error(error);
}

export const SLICE_NAME = 'history' as const;
export const history = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setHistory(state, action: PayloadAction<THistoryItem>) {
      const { list } = state;
      state.list = list.concat(action.payload);
    },

    viewHistoryEntry(state, action: PayloadAction<number | undefined>) {
      const matched = state.list.find((item) => item.date === action.payload);
      state.current = matched;
    },

    removeHistoryEntry(state, action: PayloadAction<number>) {
      const { list } = state;

      state.list = list.filter((item) => item.date !== action.payload);
    },

    clearHistory(state) {
      state.list = [];
      state.current = undefined;
    },
  },
  extraReducers(builder) {
    builder.addCase(initChatWithHistory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(initChatWithHistory.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(initChatWithHistory.rejected, (state) => {
      state.loading = false;
    });
  },
});
