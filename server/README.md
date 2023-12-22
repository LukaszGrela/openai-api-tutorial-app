# Server of the OpenAI API tutorial APP

Provides API endpoints to communicate with the OpenAI API.

## Setup

Create `.env.local` in the root of `frontend` folder with the `OPENAI_API_KEY` field. Set your OpenAI access key.

```
OPENAI_API_KEY=xx-xxxxyyyyyzzzzzyoursecretaccesscodezzzzzyyyyxxxx
```

## Endpoints

- `/api/history` - GET - Returns the current history `list` with the `rateLimit` data.
- `/api/history/reset` - POST - Resets the history to the default system role. If body of the request contains the valid `prompt` and `role` it can set it instead of default. The `cold` body param indicates if `temperature` should be set to `0` or to `0.75`. Returns current history `list` and `rateLimit` data.
- `/api/chat` - POST - Adds user prompt to the history and calls `openai.chat.completions.create`. Returns response `message` and `rateLimit` data.
