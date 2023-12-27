export type TResponse = { id: string | number; role: string; content: string };

export type TLimits = {
  requestsLimit: number;
  requestsRemaining: number;
  tokensLimit: number;
  tokensRemaining: number;
  tokensUsageBasedLimit: number;
  tokensUsageBasedRemaining: number;
};

export type THistoryResponse = {
  list: TResponse[];
  rateLimit: TLimits;
};

export type TPromptResponse = {
  message: TResponse;
  rateLimit: TLimits;
};
