import { BarResponse, BarSourceResponse } from '../../../types';

/**
 * transform raw rest data to RestBarResponse
 * @param source raw rest data
 */
export function transform(source: BarSourceResponse): BarResponse[] {
  const response: BarResponse[] = [];

  for (const item of source.data) {
    const bar: BarResponse = {
      openTime: item[0],
      open: +item[1],
      high: +item[2],
      low: +item[3],
      close: +item[4],
      volume: +item[5],
      closeTime: item[6],
      quoteVolume: +item[7],
      trades: +item[8],
    };
    response.push(bar);
  }

  return response;
}
