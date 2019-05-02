import { ErrorResponse, RestResponse } from '../../types';

export interface BarSourceResponse extends RestResponse {
  data: {
    status: string;
    ch: string;
    ts: number;
    data: BarSource[];
  };
}

export interface BarSource {
  id: number;
  open: number;
  close: number;
  low: number;
  high: number;
  amount: number;
  vol: number;
  count: number;
}

export interface BarResponse {
  time: number;
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
  data: {
    status: string;
    data: SymbolSource[];
  };
}

export interface SymbolSource {
  'base-currency': string;
  'quote-currency': string;
  'price-precision': number;
  'amount-precision': number;
  'symbol-partition': string;
  symbol: string;
}

export interface RestSymbolResponse extends ErrorResponse {
  symbols: string[];
}
