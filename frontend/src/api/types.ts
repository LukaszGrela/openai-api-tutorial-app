export type TResponse = {
  id: string | number;
  role: 'user' | 'assistant' | 'system';
  content: string;
  finishReason?:
    | 'stop'
    | 'length'
    | 'tool_calls'
    | 'content_filter'
    | 'function_call';
};

export type TLimits = {
  requestsLimit: number;
  requestsRemaining: number;
  tokensLimit: number;
  tokensRemaining: number;
  tokensUsageBasedLimit: number;
  tokensUsageBasedRemaining: number;
};

export type TUsage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
};

export type THistoryResponse = {
  list: TResponse[];
  rateLimit: TLimits;
  usage?: TUsage;
};

export type TPromptResponse = {
  message: TResponse;
  rateLimit: TLimits;
  finishReason?:
    | 'stop'
    | 'length'
    | 'tool_calls'
    | 'content_filter'
    | 'function_call';
  usage?: TUsage;
};
