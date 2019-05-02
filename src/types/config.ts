import { SupportedExchange } from './exchange';

export interface Config {
  alerter: ConfigAlerter;
  binance: ConfigExchange;
  huobi: ConfigExchange;
  okex: ConfigExchange;
}

export interface ConfigAlerter {
  exchanges: SupportedExchange[];
}

export interface ConfigExchange {
  allPairs: boolean;
  pairs: string[];
  periods: string[];
  chatId: number;
  accessKey: string;
  macd: ConfigMacd;
}

export interface ConfigMacd {
  period: ConfigMacdPeriod;
}

export interface ConfigMacdPeriod {
  fast: number;
  slow: number;
  signal: number;
}
