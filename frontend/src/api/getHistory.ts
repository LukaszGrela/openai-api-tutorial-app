import { THistoryResponse } from './types';

export const getHistory = async () => {
  const base = `${import.meta.env.VITE_API_URL}`;
  const endpoint = new URL(
    'history',
    base.lastIndexOf('/') !== base.length ? `${base}/` : base
  );

  const response = await fetch(endpoint.toString(), {
    method: 'GET',
  });

  return response.json() as Promise<THistoryResponse>;
};
