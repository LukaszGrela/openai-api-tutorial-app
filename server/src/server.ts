import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import 'openai/shims/node';
import cors from 'cors';
import OpenAI from 'openai';

dotenv.config();
dotenv.config({ path: `.env.local`, override: true });

type TEnrichWithId<T> = T & { id: string | number };
type TChatCompletionMessageParam = OpenAI.ChatCompletionMessageParam;
type TLimits = {
  requestsLimit: number;
  requestsRemaining: number;
  tokensLimit: number;
  tokensRemaining: number;
  tokensUsageBasedLimit: number;
  tokensUsageBasedRemaining: number;
};

function getFromArray(arr: string[]): number {
  if (Array.isArray(arr) && arr.length > 0 && !isNaN(parseInt(arr[0]))) {
    return parseInt(arr[0]);
  }
  return 0;
}

function getLimits(responseHeaders: Record<string, string[]>): TLimits {
  return {
    requestsLimit: getFromArray(responseHeaders['x-ratelimit-limit-requests']),
    requestsRemaining: getFromArray(
      responseHeaders['x-ratelimit-remaining-requests']
    ),
    tokensLimit: getFromArray(responseHeaders['x-ratelimit-limit-tokens']),
    tokensRemaining: getFromArray(
      responseHeaders['x-ratelimit-remaining-tokens']
    ),
    tokensUsageBasedLimit: getFromArray(
      responseHeaders['x-ratelimit-limit-tokens_usage_based']
    ),
    tokensUsageBasedRemaining: getFromArray(
      responseHeaders['x-ratelimit-remaining-tokens_usage_based']
    ),
  };
}

(async (port) => {
  const server: Express = express();
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const model = 'gpt-3.5-turbo';

  let defaultSystemRole: TEnrichWithId<TChatCompletionMessageParam> = {
    id: new Date().getTime(),
    role: 'system',
    content:
      'You are a helpful AI assistant. Answser questions to your best ability.',
  };

  let history: TEnrichWithId<TChatCompletionMessageParam>[] = [
    defaultSystemRole,
  ];
  let rateLimit = getLimits({});

  let temperature = 0;

  const chatCompletion = async (
    messages: TChatCompletionMessageParam[],
    temperature = 0
  ) => {
    const response = await openai.chat.completions
      .create({
        model,
        messages,
        temperature,
      })
      .asResponse();

    const chat = await response.json();

    return {
      headers: response.headers.raw(),
      chat,
    };
  };

  const initHistory = async (
    content?: string,
    role: 'system' | 'assistant' = 'system',
    cold = true
  ) => {
    console.log('initHistory', role, cold, content);
    // rest history
    history = content
      ? [{ role, content, id: new Date().getTime() }]
      : [defaultSystemRole];

    temperature = cold ? 0 : 0.75;

    const { chat, headers } = await chatCompletion(
      history.map(({ id, ...idLess }) => idLess),
      temperature
    );

    rateLimit = getLimits(headers);

    history.push({ id: chat.id, ...chat.choices[0].message });
  };

  server.use(express.json());
  server.use(cors());

  // api endpoints
  await initHistory();

  server.get('/api/history', (_: Request, res: Response) => {
    res.status(200).send({ list: history, rateLimit });
  });

  server.post('/api/history/reset', async (req: Request, res: Response) => {
    const { prompt, role, cold } = req.body;

    await initHistory(prompt, role, cold);

    res.status(200).send({ list: history, rateLimit });
  });

  server.post('/api/chat', async (req: Request, res: Response) => {
    const { prompt, role } = req.body;

    // add user
    history.push({
      id: new Date().getTime(),
      role,
      content: prompt,
    });

    const { chat, headers } = await chatCompletion(
      history.map(({ id, ...idLess }) => idLess),
      temperature
    );

    rateLimit = getLimits(headers);

    console.log(JSON.stringify(chat));
    const response = { id: chat.id, ...chat.choices[0].message };
    // add ai response
    history.push(response);

    res.status(200).send({ rateLimit, message: response });
  });

  // start listening
  server.listen(port, () => {
    console.log(`[-=SERVER=-]: Server is running at http://localhost:${port}`);
  });
})(process.env.PORT);
