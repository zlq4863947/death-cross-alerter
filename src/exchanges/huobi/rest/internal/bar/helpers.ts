import { BarResponse, BarSourceResponse } from '../../../types';

/**
 * transform raw rest data to BarResponse
 * @param source raw rest data
 */
export function transform(source: BarSourceResponse): BarResponse[] {
  const response: BarResponse[] = [];

  for (const item of source.data.data) {
    const bar: BarResponse = {
      time: item.id,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
      volume: item.vol,
    };
    response.push(bar);
  }

  return response;
}
