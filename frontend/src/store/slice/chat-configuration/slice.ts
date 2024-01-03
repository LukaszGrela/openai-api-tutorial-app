import { IChatConfigurationState, TSetChatConfigurationAction } from './types';

const initialState: IChatConfigurationState = {
  temperature: 0,
};

const chatConfigurationSlice = (
  state = initialState,
  action: TSetChatConfigurationAction
): IChatConfigurationState => {
  switch (action.type) {
    case 'chat-configuration/SET':
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };

    default:
      break;
  }
  return state;
};

export default chatConfigurationSlice;
