import { ema } from './ema';
import { MacdInput, macd } from './macd';
import { sma } from './sma';

describe('indicator ma', () => {
  const closeList = [127.75, 129.02, 132.75, 145.4, 148.98];

  it('sma', async () => {
    const res = sma({ values: closeList, period: 3 });
    expect(res).toEqual([NaN, NaN, 129.84, 135.72333333333333, 142.37666666666667]);
  });

  it('ema', async () => {
    const res = ema({ values: closeList, period: 3 });
    expect(res).toEqual([NaN, NaN, 129.84, 137.62, 143.3]);
  });

  it('macd', async () => {
    const values = [
      127.75,
      129.02,
      132.75,
      145.4,
      148.98,
      137.52,
      147.38,
      139.05,
      137.23,
      149.3,
      162.45,
      178.95,
      200.35,
      221.9,
      243.23,
      243.52,
      286.42,
      280.27,
    ];

    const input: MacdInput = {
      period: {
        fast: 5,
        slow: 8,
        signal: 3,
      },
      values,
    };
    const res = macd(input);
    expect(res).toEqual([
      { MACD: NaN, signal: NaN, histogram: NaN },
      { MACD: NaN, signal: NaN, histogram: NaN },
      { MACD: NaN, signal: NaN, histogram: NaN },
      { MACD: NaN, signal: NaN, histogram: NaN },
      { MACD: NaN, signal: NaN, histogram: NaN },
      { MACD: NaN, signal: NaN, histogram: NaN },
      { MACD: NaN, signal: NaN, histogram: NaN },
      { MACD: 1.5206018518518647, signal: NaN, histogram: NaN },
      { MACD: 0.8747067901234686, signal: NaN, histogram: NaN },
      { MACD: 1.8161162551440384, signal: 1.4038082990397907, histogram: 0.41230795610424775 },
      { MACD: 3.630838477366268, signal: 2.5173233882030295, histogram: 1.1135150891632386 },
      { MACD: 6.1361878905654805, signal: 4.326755639384255, histogram: 1.8094322511812253 },
      { MACD: 9.35850329810836, signal: 6.842629468746308, histogram: 2.515873829362052 },
      { MACD: 12.730555487344787, signal: 9.786592478045549, histogram: 2.943963009299239 },
      { MACD: 15.906022882701109, signal: 12.846307680373329, histogram: 3.05971520232778 },
      { MACD: 16.40655983713023, signal: 14.62643375875178, histogram: 1.7801260783784514 },
      { MACD: 20.217463455194945, signal: 17.421948606973363, histogram: 2.7955148482215826 },
      { MACD: 20.012564334547392, signal: 18.717256470760375, histogram: 1.2953078637870163 },
    ]);
  });
});
