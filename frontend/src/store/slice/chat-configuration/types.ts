type TStateKeys = keyof IChatConfigurationState;

export type TSetChatConfigurationActionPayload = {
  [Field in TStateKeys]: {
    key: Field;
    value: IChatConfigurationState[Field];
  };
}[TStateKeys];

export interface IChatConfigurationState {
  temperature: number;
}
