import type { TPromptResponse } from '../../../../api/types';
import type { TError } from '../../../types';

export type TChatSendPromptStart = {
  type: 'chat/SEND_PROMPT/start';
  payload: string;
};
export type TChatSendPromptFinish = {
  type: 'chat/SEND_PROMPT/finish';
  payload: TPromptResponse;
};
export type TChatSendPromptFail = {
  type: 'chat/SEND_PROMPT/fail';
  payload: TError;
};
export type TChatSendPrompt =
  | TChatSendPromptStart
  | TChatSendPromptFinish
  | TChatSendPromptFail;

export type TChatSendSystemPromptStart = {
  type: 'chat/SEND_SYSTEM_PROMPT/start';
  payload: string;
};
export type TChatSendSystemPromptFinish = {
  type: 'chat/SEND_SYSTEM_PROMPT/finish';
  payload: string;
};
export type TChatSendSystemPromptFail = {
  type: 'chat/SEND_SYSTEM_PROMPT/fail';
  payload: TError;
};
