export enum SupportedExchange {
  Binance = 'binance',
  Huobi = 'huobi',
  Okex = 'okex',
}

export interface Bar {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  time: string;
}
