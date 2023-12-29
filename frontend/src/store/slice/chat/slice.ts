import type {
  TChatSendPrompt,
  TChatSendSystemPrompt,
  TInitChatAction,
  TRestartAction,
  TSetChatHistoryAction,
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
    | TSetChatHistoryAction
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
        error: action.payload,
      };
    case 'chat/SEND_PROMPT/finish':
      return {
        ...state,
        error: undefined,
        loading: false,
        // chat gpt response
        list: [
          ...state.list,
          {
            ...action.payload.message,
            finishReason: action.payload.finishReason,
          },
        ],
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
        error: undefined,
      };
    case 'chat/INIT/fail':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'chat/SEND_SYSTEM_PROMPT/start':
    case 'chat/RESTART/start':
      return {
        ...state,
        loading: true,
      };
    case 'chat/SEND_SYSTEM_PROMPT/fail':
    case 'chat/RESTART/fail':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'chat/SEND_SYSTEM_PROMPT/finish':
    case 'chat/RESTART/finish':
      return {
        ...state,
        loading: false,
        list: action.payload.list,
        error: undefined,
      };
    case 'chat/history/SET':
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};

export default slice;
