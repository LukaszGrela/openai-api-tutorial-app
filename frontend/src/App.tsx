import { useCallback, useEffect, useState } from 'react';
import { ChatForm } from './components/ChatForm';
import { TChatFormData } from './components/ChatForm/types';
import { ChatOutput } from './components/ChatOutput';
import { TLimits } from './api/types';
import { ChatLimits } from './components/ChatLimits';
import { Provider } from 'react-redux';
import store from './store';
import { useAppDispatch, useAppSelector } from './store/slice/hooks';
import {
  initChatAction,
  restartChatAction,
  sendPromptAction,
  sendSystemPromptAction,
} from './store/slice/chat';

import './App.css';

function App() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(
    (state) => state.history.loading || state.chat.loading
  );
  const responses = useAppSelector(({ chat }) => chat.list);

  const [limits] = useState<TLimits>({
    requestsLimit: 0,
    requestsRemaining: 0,
    tokensLimit: 0,
    tokensRemaining: 0,
    tokensUsageBasedLimit: 0,
    tokensUsageBasedRemaining: 0,
  });

  useEffect(() => {
    dispatch(initChatAction());
  }, [dispatch]);

  const handleSubmit = useCallback(
    async ({ prompt }: TChatFormData) => {
      dispatch(sendPromptAction(prompt));
    },
    [dispatch]
  );

  const handleRestart = useCallback(async () => {
    dispatch(restartChatAction());
  }, [dispatch]);

  const handleSetSystem = useCallback(
    async ({ prompt }: TChatFormData) => {
      dispatch(sendSystemPromptAction(prompt));
    },
    [dispatch]
  );

  return (
    <main className='app'>
      <h1>ChatGPT for Web Developers</h1>
      <ChatForm
        disable={loading}
        onSubmit={handleSubmit}
        onReset={handleRestart}
        onSetSystem={handleSetSystem}
      />
      <ChatLimits limits={limits} />
      <ChatOutput autoScroll responses={responses} />
    </main>
  );
}

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWrapper;
