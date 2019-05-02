import { ema } from './ema';

export interface MacdInput {
  period: {
    fast: number;
    slow: number;
    signal: number;
  };
  values: number[];
}

export interface MacdOutput {
  MACD: number;
  signal: number;
  histogram: number;
}

/**
 * MACD
 * Moving Average Convergence / Divergence
 * 异同移动平均线
 * ```
 表达式:
  MACD Line: (12-day EMA - 26-day EMA)
  Signal Line: 9-day EMA of MACD Line
  MACD Histogram: MACD Line - Signal Line
 ```
 * @param input MacdInput
 */
export function macd(input: MacdInput): MacdOutput[] {
  const results: MacdOutput[] = [];

  const fastPeriod = input.period.fast;
  const slowPeriod = input.period.slow;
  const signalPeriod = input.period.signal;
  const values = input.values;

  let fastList: number[] = [];
  let slowList: number[] = [];
  const macdList: number[] = [];
  const calcList: number[] = [];
  for (const [i, value] of values.entries()) {
    calcList.push(value);
    fastList = ema({
      period: fastPeriod,
      values: calcList,
    });

    slowList = ema({
      period: slowPeriod,
      values: calcList,
    });

    let macdVal: number;
    let signal: number;
    let histogram: number;
    if (!fastList[i] || !slowList[i]) {
      macdVal = NaN;
      signal = NaN;
      histogram = NaN;
    } else {
      macdVal = fastList[i] - slowList[i];
      macdList.push(macdVal);
      signal = macdSignal(macdList, signalPeriod);
      histogram = macdVal - signal;
    }
    results.push({ MACD: macdVal, signal, histogram });
  }

  return results;
}

function macdSignal(macdList: number[], period: number): number {
  const results: number[] = [];
  const calcList: number[] = [];
  for (const m of macdList) {
    calcList.push(m);
    if (calcList.length === period) {
      let result;
      if (results.length === 0) {
        const emaList = ema({ period, values: calcList });
        result = emaList.length > 0 ? emaList[emaList.length - 1] : NaN;
      } else {
        const prevSignal = results[results.length - 1];
        result = m * (2 / (period + 1)) + prevSignal * (1 - 2 / (period + 1));
      }
      results.push(result);
      calcList.shift();
    }
  }

  return results.length > 0 ? results[results.length - 1] : NaN;
}
