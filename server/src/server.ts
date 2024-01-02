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

function filterHistory(
  history: TEnrichWithId<TChatCompletionMessageParam>[]
): TChatCompletionMessageParam[] {
  return history.map(
    ({ role, content }) => ({ role, content } as TChatCompletionMessageParam)
  );
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

    const chat = (await response.json()) as OpenAI.ChatCompletion;

    return {
      headers: response.headers.raw(),
      chat,
    };
  };

  const initHistory = async (
    content?: string,
    role: 'system' | 'assistant' = 'system',
    temp = 0
  ) => {
    // rest history
    history = content
      ? [{ role, content, id: new Date().getTime() }]
      : [defaultSystemRole];

    temperature = isNaN(temp) ? 0 : temp;

    const { chat, headers } = await chatCompletion(
      filterHistory(history),
      temperature
    );

    rateLimit = getLimits(headers);

    history.push({ id: chat.id, ...chat.choices[0].message });

    return chat.usage;
  };

  server.use(express.json());
  server.use(cors());

  // api endpoints
  await initHistory();

  server.get('/api/history', (_: Request, res: Response) => {
    res.status(200).send({ list: history, rateLimit });
  });

  server.post('/api/history', async (req: Request, res: Response) => {
    const list = req.body;
    console.log('POST/api/history', list);
    if (!list || !Array.isArray(list) || list.length === 0) {
      res.status(400).json('Provide valid history list');
      return;
    }

    console.log('list', list.length, list);

    history = list;

    res.status(200).json('OK');
  });

  server.post('/api/history/reset', async (req: Request, res: Response) => {
    const { prompt, role, temp } = req.body;
    try {
      const usage = await initHistory(prompt, role, temp);

      res.status(200).send({ list: history, rateLimit, usage });
    } catch (error) {
      if ((error as any).status === 400) {
        // Bad request from API
        res.status(400).send(error);
      } else {
        res.status(500).send(error);
      }
    }
  });

  server.post('/api/chat', async (req: Request, res: Response) => {
    const { prompt, role } = req.body;

    // add user
    history.push({
      id: new Date().getTime(),
      role,
      content: prompt,
    });
    try {
      const { chat, headers } = await chatCompletion(
        filterHistory(history),
        temperature
      );

      rateLimit = getLimits(headers);

      console.log(JSON.stringify(chat));
      const response = { id: chat.id, ...chat.choices[0].message };
      // add ai response
      history.push(response);

      res.status(200).send({
        rateLimit,
        message: response,
        usage: chat.usage,
        finishReason: chat.choices[0].finish_reason,
      });
    } catch (error) {
      if ((error as any).status === 400) {
        // Bad request from API
        res.status(400).send(error);
      } else {
        res.status(500).send(error);
      }
    }
  });

  // start listening
  server.listen(port, () => {
    console.log(`[-=SERVER=-]: Server is running at http://localhost:${port}`);
  });
})(process.env.PORT);
