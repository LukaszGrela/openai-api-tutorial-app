type TStateKeys = keyof IChatConfigurationState;

export type TSetChatConfigurationActionPayload = {
  [Field in TStateKeys]: {
    key: Field;
    value: IChatConfigurationState[Field];
  };
}[TStateKeys];

export type TSetChatConfigurationAction = {
  type: 'chat-configuration/SET';
  payload: TSetChatConfigurationActionPayload;
};

export interface IChatConfigurationState {
  temperature: number;
}
