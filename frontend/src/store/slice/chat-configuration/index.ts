import { SLICE_NAME, chatConfiguration } from './slice';

export { SLICE_NAME };
export * from './types';
export const { setChatConfiguration } = chatConfiguration.actions;

export default chatConfiguration.reducer;
