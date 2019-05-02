import { Config } from '../types';
import { simpleCloseList } from './data';
import { DeathCross } from './death-cross';

// tslint:disable-next-line:no-var-requires
const config: Config = require('config');

describe('goladen-croos', () => {
  let deathCross: DeathCross;
  beforeAll(() => {
    deathCross = new DeathCross();
  });

  const values = simpleCloseList;

  it('return false', () => {
    const res = deathCross.macd(values, config.binance.macd.period);
    expect(res).toBeFalsy();
  });

  it('return true', () => {
    const vals = values.slice(0, 49);
    const res = deathCross.macd(vals, config.binance.macd.period);
    expect(res).toBeTruthy();
  });
});
