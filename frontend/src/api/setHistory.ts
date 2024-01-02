import type { TResponse } from './types';

export const setHistory = async (list: TResponse[]) => {
  const base = `${import.meta.env.VITE_API_URL}`;
  const endpoint = new URL(
    'history',
    base.lastIndexOf('/') !== base.length ? `${base}/` : base
  );
  const response = await fetch(endpoint.toString(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(list),
  });

  if (!response.ok) {
    const error = (await response.json()).error;
    return Promise.reject(error);
  }
};
