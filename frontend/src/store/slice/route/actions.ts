import { TRoute, TSetRoute } from './types';

export const setRoute = (payload: TRoute): TSetRoute => ({
  type: 'route/SET',
  payload,
});
