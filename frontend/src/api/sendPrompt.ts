import { TPromptResponse } from './types';

export const sendPrompt = async (prompt: string) => {
  const base = `${import.meta.env.VITE_API_URL}`;
  const endpoint = new URL(
    'chat',
    base.lastIndexOf('/') !== base.length ? `${base}/` : base
  );

  const response = await fetch(endpoint.toString(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, role: 'user' }),
  });

  if (!response.ok) {
    const error = (await response.json()).error;
    return Promise.reject(error);
  }
  return response.json() as Promise<TPromptResponse>;
};
