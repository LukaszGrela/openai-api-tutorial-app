export type TRoute = 'chat' | 'history';

export type TSetRoute = {
  type: 'route/SET';
  payload: TRoute;
};
