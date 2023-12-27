import type {
  TChatSendPrompt,
  TChatSendSystemPrompt,
  TInitChatAction,
  TRestartAction,
} from './actions';
import { IChatState } from './types';

const initialState: IChatState = {
  list: [],
  loading: false,
  initiated: false,
};

let id = 0;

const slice = (
  state = initialState,
  action:
    | TChatSendPrompt
    | TInitChatAction
    | TChatSendSystemPrompt
    | TRestartAction
): IChatState => {
  switch (action.type) {
    case 'chat/SEND_PROMPT/start':
      return {
        ...state,
        list: [
          ...state.list,
          // user prompt
          { id: ++id, role: 'user', content: action.payload },
        ],
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
        // chat gpt response
        list: [...state.list, action.payload.message],
      };

    case 'chat/INIT/start':
      return {
        ...state,
        loading: true,
      };
    case 'chat/INIT/finish':
      return {
        initiated: true,
        list: action.payload.list,
        loading: false,
      };
    case 'chat/INIT/fail':
      return {
        ...state,
        loading: false,
      };

    default:
      break;
  }
  return state;
};

export default slice;
