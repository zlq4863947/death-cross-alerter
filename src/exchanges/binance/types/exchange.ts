export enum Resolution {
  min = '1m',
  min3 = '3m',
  min5 = '5m',
  min15 = '15m',
  min30 = '30m',
  hour = '1h',
  hour2 = '2h',
  hour4 = '4h',
  hour6 = '6h',
  hour8 = '8h',
  hour12 = '12h',
  day = '1d',
  day3 = '3d',
  week = '1w',
  month = '1M',
}

export const baseUrl = 'https://api.binance.com';

export enum PublicEndPoints {
  Bar = '/api/v1/klines',
  Symbol = '/api/v3/ticker/price',
}
