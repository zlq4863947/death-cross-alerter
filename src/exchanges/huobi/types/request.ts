import { Resolution } from './exchange';

export interface RestBarRequest {
  symbol: string;
  period: Resolution;
  // Default 150; max 2000
  size?: number;
}
