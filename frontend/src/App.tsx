import { useEffect } from 'react';
import { ChatForm } from './components/ChatForm';
import { ChatOutput } from './components/ChatOutput';
import { ChatLimits } from './components/ChatLimits';
import { Provider } from 'react-redux';
import store from './store';
import { useAppDispatch } from './store/slice/hooks';
import { initChatAction } from './store/slice/chat';
import { ChatError } from './components/ChatError';

import './App.css';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initChatAction());
  }, [dispatch]);

  return (
    <main className='app'>
      <h1>ChatGPT for Web Developers</h1>
      <ChatForm />
      <ChatError />
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
