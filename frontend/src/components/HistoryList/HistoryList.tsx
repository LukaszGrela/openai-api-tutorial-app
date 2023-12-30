import { FC } from 'react';
import { useAppSelector } from '../../store/hooks';
import {
  DeleteHistoryItem,
  SwitchToChat,
  UseHistoryItem,
  ViewHistoryItem,
} from './tools';

import './HistoryList.css';

const getNavigatorLanguage = (): string => {
  if (navigator.languages && navigator.languages.length) {
    return navigator.languages[0];
  } else {
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (navigator as any).userLanguage ||
      navigator.language ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (navigator as any).browserLanguage ||
      'en'
    );
  }
};

const dateConfig: Intl.DateTimeFormatOptions = {
  timeZone: 'Europe/Warsaw',
  dateStyle: 'short',
  timeStyle: 'short',
};

const [, locale] = getNavigatorLanguage()
  .replace('-', '_')
  .toLowerCase()
  .split('_');

const HistoryList: FC = () => {
  const list = useAppSelector((state) => state.history.list);
  return (
    <div className='history-list'>
      <div className='list'>
        <ul>
          {list.map(({ date, list, usage }) => (
            <li className='history-item' key={date.getTime()}>
              <span className='date'>
                Created: {date.toLocaleString(locale, dateConfig)}
              </span>
              <span className='tokens'>Used tokens: {usage.total_tokens}</span>
              <span className='size'>Length: {list.length}</span>
              <span className='tools'>
                <ViewHistoryItem date={date} />
                <DeleteHistoryItem date={date} />
                <UseHistoryItem date={date} />
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className='tools'>
        <SwitchToChat />
      </div>
    </div>
  );
};
export default HistoryList;
