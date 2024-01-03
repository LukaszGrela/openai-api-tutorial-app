import { FC } from 'react';
import { ChatTemperature } from '../ChatConfiguration';
import { RestartChat, SwitchToHistory } from './tools';

import './ChatForm.css';
import { Form } from './Form';

const ChatForm: FC = (): JSX.Element => {
  return (
    <div className='chat-form'>
      <Form />
      <div className='tools configuration'>
        <ChatTemperature />
      </div>
      <div className='tools'>
        <RestartChat />
        <SwitchToHistory />
      </div>
    </div>
  );
};

export default ChatForm;
