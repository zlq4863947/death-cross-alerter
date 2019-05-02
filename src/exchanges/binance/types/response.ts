import { ErrorResponse, RestResponse } from '../../types';

export interface BarSourceResponse extends RestResponse {
  data: [number, string, string, string, string, string, number, string, number, string, string, string][];
}

export interface BarResponse {
  openTime: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  closeTime: number;
  quoteVolume: number;
  trades: number;
}

export interface RestBarResponse extends ErrorResponse {
  bars: BarResponse[];
}

export interface SymbolSourceResponse extends RestResponse {
  data: SymbolSourceResponse[];
}

export interface SymbolSourceResponse {
  symbol: string;
  price: string;
}

export interface RestSymbolResponse extends ErrorResponse {
  symbols: string[];
}
