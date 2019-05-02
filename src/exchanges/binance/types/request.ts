import { Resolution } from './exchange';

export interface RestBarRequest {
  symbol: string;
  interval: Resolution;
  startTime?: number;
  endTime?: number;
  // Default 500; max 1000.
  limit?: number;
}
