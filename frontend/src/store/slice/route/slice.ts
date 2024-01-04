import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { TRoute } from './types';

const initialState: TRoute = 'chat' as TRoute;

export const SLICE_NAME = 'route' as const;
export const route = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setRoute(_, action: PayloadAction<TRoute>) {
      return action.payload;
    },
  },
});
