import type { TChatSendPrompt } from './actions';
import { IChatState } from './types';

const initialState: IChatState = {
  list: [],
  loading: false,
};

const slice = (state = initialState, action: TChatSendPrompt): IChatState => {
  switch (action.type) {
    case 'chat/SEND_PROMPT/start':
      return {
        ...state,
        loading: true,
      };
    case 'chat/SEND_PROMPT/fail':
      return {
        ...state,
        loading: false,
      };
    case 'chat/SEND_PROMPT/finish':
      return {
        ...state,
        loading: false,
        list: [...state.list, action.payload.message],
      };

    default:
      break;
  }
  return state;
};

export default slice;
