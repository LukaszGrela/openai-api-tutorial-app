import { THistoryResponse } from './types';

export const clearHistory = async (cold = true) => {
  const base = `${import.meta.env.VITE_API_URL}`;
  const endpoint = new URL(
    'history/reset',
    base.lastIndexOf('/') !== base.length ? `${base}/` : base
  );

  const response = await fetch(endpoint.toString(), {
    method: 'POST',

    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cold }),
  });

  if (!response.ok) {
    const error = (await response.json()).error;
    return Promise.reject(error);
  }

  return response.json() as Promise<THistoryResponse>;
};

export const clearHistoryAndSetSystem = async (
  prompt: string,
  role: 'system' | 'assistant' = 'assistant',
  cold = true
) => {
  const base = `${import.meta.env.VITE_API_URL}`;
  const endpoint = new URL(
    'history/reset',
    base.lastIndexOf('/') !== base.length ? `${base}/` : base
  );

  const response = await fetch(endpoint.toString(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, role, cold }),
  });

  if (!response.ok) {
    const error = (await response.json()).error;
    return Promise.reject(error);
  }

  return response.json() as Promise<THistoryResponse>;
};
