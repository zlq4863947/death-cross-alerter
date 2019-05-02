import { Resolution } from '../../../types';
import { Bar } from './bar';

describe('Binance Rest Symbol', () => {
  const bar = new Bar();

  it('fetch bars', async () => {
    const res = await bar.fetch({
      instrument_id: 'BTC-USDT',
      granularity: Resolution.day,
      start: '2019-02-14T16:55:06.000Z',
      end: '2019-03-14T16:55:06.000Z',
    });
    expect(res.bars.length).toBeGreaterThan(10);
    expect(res.error).toBeUndefined();
  });
});
