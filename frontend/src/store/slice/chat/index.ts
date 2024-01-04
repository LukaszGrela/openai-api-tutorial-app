import { SLICE_NAME, chat } from './slice';

export { SLICE_NAME };
export * from './types';
export * from './actions';
export const { setChatHistory } = chat.actions;

export default chat.reducer;
