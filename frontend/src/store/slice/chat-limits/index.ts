import { SLICE_NAME, chatLimits } from './slice';

export { SLICE_NAME };
export * from './types';
export const { setChatLimits, setChatUsage } = chatLimits.actions;

export default chatLimits.reducer;
