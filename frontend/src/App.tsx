import { useCallback, useEffect, useState } from 'react';
import { sendPrompt } from './api/sendPrompt';
import { ChatForm } from './components/ChatForm';
import { TChatFormData } from './components/ChatForm/types';
import { ChatOutput } from './components/ChatOutput';
import { clearHistory, clearHistoryAndSetSystem } from './api/clearHistory';
import { TResponse } from './components/ChatOutput/types';
import './App.css';
import { getHistory } from './api/getHistory';
import { TLimits } from './api/types';
import { ChatLimits } from './components/ChatLimits';

let id = 0;

function App() {
  const [loading, setLoading] = useState(false);
  const [responses, addResponse] = useState<TResponse[]>([]);
  const [limits, setLimits] = useState<TLimits>({
    requestsLimit: 0,
    requestsRemaining: 0,
    tokensLimit: 0,
    tokensRemaining: 0,
    tokensUsageBasedLimit: 0,
    tokensUsageBasedRemaining: 0,
  });

  useEffect(() => {
    const fetchInitHistory = async () => {
      setLoading(true);
      try {
        const { list, rateLimit } = await getHistory();
        setLimits(rateLimit);
        addResponse(list);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitHistory();
  }, []);

  const handleSubmit = useCallback(async ({ prompt }: TChatFormData) => {
    console.log('Chat', prompt);
    addResponse((responses) => [
      ...responses,
      { id: ++id, role: 'user', content: prompt },
    ]);
    setLoading(true);
    try {
      const { message, rateLimit } = await sendPrompt(prompt);
      console.log(message);
      setLimits(rateLimit);
      addResponse((responses) => [...responses, message]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRestart = useCallback(async () => {
    setLoading(true);
    try {
      const { list, rateLimit } = await clearHistory();
      console.log(list);
      setLimits(rateLimit);
      addResponse(list);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSetSystem = useCallback(
    async ({ prompt, isSilly }: TChatFormData) => {
      setLoading(true);
      try {
        const { list, rateLimit } = await clearHistoryAndSetSystem(
          prompt,
          'system',
          !isSilly
        );
        console.log(list);
        setLimits(rateLimit);
        addResponse(list);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    []
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

export default App;
