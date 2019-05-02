import { Config } from '../types';
import { postTelegram } from './sender';

// tslint:disable-next-line:no-var-requires
const config: Config = require('config');

describe('sender', () => {
  const chatId = config.binance.chatId;

  it('post telegram', async () => {
    const res = await postTelegram(chatId, 'config.binance.macd.period');
    expect(res).toBeUndefined();
  });
});
