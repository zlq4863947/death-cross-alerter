import { DeathCross } from '../../signal';
import { Pretrade } from './pretrade';
import { OkexRest } from './rest';
import { Resolution } from './types';

describe('Okex Pretrade', () => {
  const rest = new OkexRest();
  const pretrade = new Pretrade(rest);
  const deathCross = new DeathCross();

  it('pretrade measure', async () => {
    const res = await pretrade.measure(Resolution.day);
    console.log(res);
    // expect(res.bars.length).toBeGreaterThan(10);
    // expect(res.error).toBeUndefined();
  });

  it('fetch bars', async () => {
    const pair = 'SOC-USDT';
    const res = await rest.fetchBar({
      instrument_id: pair,
      granularity: Resolution.hour,
    });
    const closeList = res.bars.map((o) => o.close);
    const macdRes = deathCross.macd(closeList, {
      fast: 12,
      slow: 26,
      signal: 9,
    });
    // const res = await pretrade.measure(Resolution.day);
    console.log(macdRes);
    // expect(res.bars.length).toBeGreaterThan(10);
    // expect(res.error).toBeUndefined();
  });
});
