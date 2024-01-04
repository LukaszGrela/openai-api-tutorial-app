import { createAsyncThunk } from '@reduxjs/toolkit';
import type { TError } from '../../../types';
import { sendPrompt } from '../../../../api/sendPrompt';
import type { TPromptResponse } from '../../../../api/types';
import { toError } from '../../../utils';

const sendPromptAction = createAsyncThunk<
  TPromptResponse,
  string,
  { rejectValue: TError }
>('chat/SEND_PROMPT', async (prompt, thunkAPI) => {
  try {
    const data = await sendPrompt(prompt);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(toError(error));
  }
});

export default sendPromptAction;
