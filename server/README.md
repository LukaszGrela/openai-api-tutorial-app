# Server of the OpenAI API tutorial APP

Provides API endpoints to communicate with the [Open AI API](https://platform.openai.com/signup).

## Setup

Create `.env.local` in the root of `frontend` folder with the `OPENAI_API_KEY` field. Set your [OpenAI access key](https://platform.openai.com/account/api-keys).

```
OPENAI_API_KEY=xx-xxxxyyyyyzzzzzyoursecretaccesscodezzzzzyyyyxxxx
```

## Endpoints

- `/api/history` - GET - Returns the current history `list` with the `rateLimit` data.
- `/api/history` - POST - Set the history list to the provided data.
- `/api/history/reset` - POST - Resets the history to the default system role. If body of the request contains the valid `prompt` and `role` it can set it instead of default. The `temp` body param indicates required `temperature` that should be set, defaults to `0`. Returns current history `list`, `rateLimit` and `usage` data.
- `/api/chat` - POST - Adds user prompt to the history and calls `openai.chat.completions.create`. Returns response `message`, `rateLimit`, `usage` and `finishReason` data.

## Scripts

- `build` - build the server application
- `prestart` - callback run before `start` command
- `start` - starts the compiled server code
- `dev` - development mode, to start the server and watch for changes in code. Once code changed the server is rebuild and restarted.
