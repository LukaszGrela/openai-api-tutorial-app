import { useCallback, useEffect } from 'react';
import { ChatForm } from './components/ChatForm';
import { TChatFormData } from './components/ChatForm/types';
import { ChatOutput } from './components/ChatOutput';
import { ChatLimits } from './components/ChatLimits';
import { Provider } from 'react-redux';
import store from './store';
import { useAppDispatch, useAppSelector } from './store/slice/hooks';
import {
  initChatAction,
  sendPromptAction,
  sendSystemPromptAction,
} from './store/slice/chat';

import './App.css';

function App() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(
    (state) => state.history.loading || state.chat.loading
  );
  const error = useAppSelector((state) => state.chat.error?.message);

  useEffect(() => {
    dispatch(initChatAction());
  }, [dispatch]);

  const handleSubmit = useCallback(
    async ({ prompt }: TChatFormData) => {
      dispatch(sendPromptAction(prompt));
    },
    [dispatch]
  );

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
        disable={loading || !!error}
        onSubmit={handleSubmit}
        onSetSystem={handleSetSystem}
      />
      {!!error && <p className='error'>{error}</p>}
      <ChatLimits />
      <ChatOutput autoScroll />
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
