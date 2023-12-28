import type { TRoute, TSetRoute } from './types';

const initialState: TRoute = 'chat';

const slice = (state = initialState, action: TSetRoute) => {
  if (action.type === 'route/SET') {
    return action.payload;
  }
  return state;
};

export default slice;
