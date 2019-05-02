import { Resolution } from './exchange';

export interface RestBarRequest {
  instrument_id: string;
  granularity?: Resolution;
  // ISO 8601标准: 2019-03-14T16:55:06.000Z
  start?: string;
  end?: string;
}
