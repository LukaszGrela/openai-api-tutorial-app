import { createAsyncThunk } from '@reduxjs/toolkit';
import type { THistoryResponse } from '../../../../api/types';
import type { TAppState, TError } from '../../../types';
import { clearHistoryAndSetSystem } from '../../../../api/clearHistory';
import { toError } from '../../../utils';

const sendSystemPromptAction = createAsyncThunk<
  THistoryResponse,
  string,
  { rejectValue: TError; state: TAppState }
>('chat/SEND_SYSTEM_PROMPT', async (prompt, thunkAPI) => {
  try {
    const { chatConfiguration } = thunkAPI.getState();

    const data = await clearHistoryAndSetSystem(
      prompt,
      'system',
      chatConfiguration.temperature
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(toError(error));
  }
});

export default sendSystemPromptAction;
