import { SLICE_NAME, route } from './slice';

export { SLICE_NAME };
export * from './types';
export const { setRoute } = route.actions;

export default route.reducer;
