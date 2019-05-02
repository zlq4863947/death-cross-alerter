export interface SmaInput {
  period: number;
  values: number[];
}

/**
 * SMA
 * Simple Moving Average
 * 简单移动平均值
 *
 * @param input
 */
export function sma(input: SmaInput): number[] {
  const results: number[] = [];
  const period = input.period;
  const values = input.values;

  const emptyList: number[] = [];
  const calcList: number[] = [];
  for (const value of values) {
    calcList.push(value);
    if (calcList.length === period) {
      const sum = calcList.reduce((prev, curr) => prev + curr);
      const result = sum / period;
      results.push(result);
      calcList.shift();
    } else {
      emptyList.push(NaN);
    }
  }

  return [...emptyList, ...results];
}
