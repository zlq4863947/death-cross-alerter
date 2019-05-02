import { ErrorResponse, RestResponse } from '../../types';

export interface BarSourceResponse extends RestResponse {
  // 开始时间、开盘价格、最高价格、最低价格、收盘价格、交易量
  data: [string, string, string, string, string, string][];
}

export interface BarResponse {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface RestBarResponse extends ErrorResponse {
  bars: BarResponse[];
}

export interface SymbolSourceResponse extends RestResponse {
  data: SymbolSource[];
}

export interface SymbolSource {
  best_ask: string;
  best_bid: string;
  instrument_id: string;
  product_id: string;
  last: string;
  ask: string;
  bid: string;
  open_24h: string;
  high_24h: string;
  low_24h: string;
  base_volume_24h: string;
  timestamp: string;
  quote_volume_24h: string;
}

export interface RestSymbolResponse extends ErrorResponse {
  symbols: string[];
}
