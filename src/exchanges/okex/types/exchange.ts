export enum Resolution {
  min = '60',
  min3 = '180',
  min5 = '300',
  min15 = '900',
  min30 = '1800',
  hour = '3600',
  hour2 = '7200',
  hour4 = '14400',
  hour6 = '21600',
  hour12 = '43200',
  day = '86400',
  week = '604800',
}

export const baseUrl = 'https://www.okex.com';

// https://www.okex.com/api/spot/v3/instruments/TCT-USDT/candles?granularity=86400&start=2019-02-18T08%3A28%3A48.899Z&end=2019-03-19T09%3A28%3A48.899Z
export enum PublicEndPoints {
  Bar = '/api/spot/v3/instruments',
  Symbol = '/api/spot/v3/instruments/ticker',
}
