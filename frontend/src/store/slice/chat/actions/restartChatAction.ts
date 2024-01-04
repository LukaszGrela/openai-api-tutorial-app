import { createAsyncThunk } from '@reduxjs/toolkit';
import type { TAppState, TError } from '../../../types';
import { clearHistory } from '../../../../api/clearHistory';
import type { THistoryResponse } from '../../../../api/types';
import { toError } from '../../../utils';

const restartChatAction = createAsyncThunk<
  THistoryResponse,
  void,
  { rejectValue: TError; state: TAppState }
>('chat/RESTART', async (_, thunkAPI) => {
  try {
    const { chatConfiguration } = thunkAPI.getState();

    const data = await clearHistory(chatConfiguration.temperature);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(toError(error));
  }
});

export default restartChatAction;
