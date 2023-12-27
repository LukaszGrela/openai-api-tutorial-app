import type { TPromptResponse } from '../../../../api/types';
import type { TError, THistoryResponse } from '../../../types';

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
  payload: THistoryResponse;
};
export type TChatSendSystemPromptFail = {
  type: 'chat/SEND_SYSTEM_PROMPT/fail';
  payload: TError;
};

export type TChatSendSystemPrompt =
  | TChatSendSystemPromptStart
  | TChatSendSystemPromptFinish
  | TChatSendSystemPromptFail;

/**
 * Init history (load from server) - start
 */
export type TInitChatActionStart = {
  type: 'chat/INIT/start';
};
/**
 * Init history (load from server) - success
 */
export type TInitChatActionFinish = {
  type: 'chat/INIT/finish';
  payload: THistoryResponse;
};

/**
 * Init history (load from server) - failure
 */
export type TInitChatActionFail = {
  type: 'chat/INIT/fail';
  payload: TError;
};

export type TInitChatAction =
  | TInitChatActionStart
  | TInitChatActionFinish
  | TInitChatActionFail;

export type TRestartActionStart = {
  type: 'chat/RESTART/start';
};
export type TRestartActionFinish = {
  type: 'chat/RESTART/finish';
  payload: THistoryResponse;
};
export type TRestartActionFail = {
  type: 'chat/RESTART/fail';
  payload: TError;
};

export type TRestartAction =
  | TRestartActionStart
  | TRestartActionFinish
  | TRestartActionFail;
