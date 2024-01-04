import { createAsyncThunk } from '@reduxjs/toolkit';
import type { TError } from '../../../types';
import { getHistory } from '../../../../api/getHistory';
import type { THistoryResponse } from '../../../../api/types';
import { toError } from '../../../utils';

const initChatAction = createAsyncThunk<
  THistoryResponse,
  void,
  { rejectValue: TError }
>('chat/INIT', async (_, thunkAPI) => {
  try {
    const data = await getHistory();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(toError(error));
  }
});

export default initChatAction;
