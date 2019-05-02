export enum Resolution {
  min = '1min',
  min5 = '5min',
  min15 = '15min',
  min30 = '30min',
  hour = '60min',
  day = '1day',
  day3 = '3d',
  week = '1week',
  month = '1mon',
  year = '1year',
}

export const baseUrl = 'https://api.huobipro.com';

// https://api.huobipro.com/market/history/kline?period=1day&size=200&symbol=btcusdt&AccessKeyId=fff-xxx-ssss-kkk
export enum PublicEndPoints {
  Bar = '/market/history/kline',
  Symbol = '/v1/common/symbols',
}
