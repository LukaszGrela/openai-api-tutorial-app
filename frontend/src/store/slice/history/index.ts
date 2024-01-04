import { SLICE_NAME, history } from './slice';

export { SLICE_NAME };
export * from './types';

export * from './actions';
export const {
  clearHistory,
  removeHistoryEntry,
  setHistory,
  viewHistoryEntry,
} = history.actions;

export default history.reducer;
