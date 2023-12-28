import { useEffect } from 'react';
import { ChatForm } from './components/ChatForm';
import { ChatOutput } from './components/ChatOutput';
import { ChatLimits } from './components/ChatLimits';
import { Provider } from 'react-redux';
import store from './store';
import { useAppDispatch, useAppSelector } from './store/slice/hooks';
import { initChatAction } from './store/slice/chat';
import { ChatError } from './components/ChatError';

import './App.css';
import { HistoryList } from './components/HistoryList';
import { HistoryOutput } from './components/HistoryOutput';

function App() {
  const dispatch = useAppDispatch();
  const route = useAppSelector((state) => state.route);

  useEffect(() => {
    dispatch(initChatAction());
  }, [dispatch]);

  return (
    <main className='app'>
      <h1>ChatGPT for Web Developers</h1>
      {route === 'chat' && (
        <div className='route chat'>
          <ChatForm />
          <ChatError />
          <ChatLimits />
          <ChatOutput autoScroll />
        </div>
      )}
      {route === 'history' && (
        <div className='route history'>
          <h2>Chat history</h2>
          <HistoryList />
          <HistoryOutput />
        </div>
      )}
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
