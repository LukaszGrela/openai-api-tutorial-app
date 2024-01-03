import {
  TSetChatConfigurationAction,
  TSetChatConfigurationActionPayload,
} from './types';

export const setChatConfiguration = (
  payload: TSetChatConfigurationActionPayload
): TSetChatConfigurationAction => ({
  type: 'chat-configuration/SET',
  payload,
});
