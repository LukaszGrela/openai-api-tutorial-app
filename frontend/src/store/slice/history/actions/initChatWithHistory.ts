import type { TAppState, TError } from '../../../types';
import type { THistoryItem } from '../types';
import { toError } from '../../../utils';
import { setHistory } from '../../../../api/setHistory';
import { createAsyncThunk } from '@reduxjs/toolkit';

const initChatWithHistory = createAsyncThunk<
  THistoryItem,
  { date: number; useSystem?: boolean },
  {
    state: TAppState;
    rejectValue: TError;
  }
>('history/USE', async ({ date }, thunkAPI) => {
  const { history } = thunkAPI.getState();
  try {
    let data = history.list.find((item) => item.date === date);
    if (!data && history.current && history.current.date === date) {
      // check current
      data = history.current;
    }

    if (data) {
      // send
      await setHistory(data.list);
      // all good
      return data;
    }

    throw new Error('History entry not found');
  } catch (error) {
    return thunkAPI.rejectWithValue(toError(error));
  }
});

export default initChatWithHistory;
