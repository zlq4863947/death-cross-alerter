export interface EmaInput {
  period: number;
  values: number[];
}

/**
 * EMA
 * Exponential Moving Average
 * 指数移动平均值
 *
 * @param input
 */
export function ema(input: EmaInput): number[] {
  const results: number[] = [];
  const period = input.period;
  const values = input.values;
  const exponent = 2 / (period + 1);

  const emptyList: number[] = [];
  const calcList: number[] = [];
  for (const value of values) {
    calcList.push(value);
    if (calcList.length === period) {
      let result;
      if (results.length === 0) {
        const sum = calcList.reduce((prev, curr) => prev + curr);
        result = sum / period;
      } else {
        const prevEma = results[results.length - 1];
        result = exponent * (value - prevEma) + prevEma;
      }
      results.push(result);
      calcList.shift();
    } else {
      emptyList.push(NaN);
    }
  }

  return [...emptyList, ...results];
}
