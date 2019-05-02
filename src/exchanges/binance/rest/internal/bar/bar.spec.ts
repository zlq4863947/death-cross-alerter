import { Resolution } from '../../../types';
import { Bar } from './bar';

describe('Binance Rest Symbol', () => {
  const bar = new Bar();

  it('fetch bars', async () => {
    const res = await bar.fetch({
      interval: Resolution.day,
      symbol: 'ETHBTC',
      limit: 50,
    });
    expect(res.bars.length).toEqual(50);
    expect(res.error).toBeUndefined();
  });
});
