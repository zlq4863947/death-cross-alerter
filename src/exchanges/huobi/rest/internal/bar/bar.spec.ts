import { Resolution } from '../../../types';
import { Bar } from './bar';

describe('Huobi Rest Bar', () => {
  const bar = new Bar();

  it('fetch bars', async () => {
    const res = await bar.fetch({
      period: Resolution.day,
      symbol: 'btcusdt',
      size: 50,
    });
    expect(res.bars.length).toEqual(50);
    expect(res.error).toBeUndefined();
  });
});
