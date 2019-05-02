import { MacdInput, MacdOutput, macd } from '../indicator';
import { ConfigMacdPeriod } from '../types';
import { match } from './helpers';

export interface DeathCrossResult {
  result: boolean;
  data?: MacdOutput;
}

export class DeathCross {
  macd(values: number[], macdPeriod: ConfigMacdPeriod): DeathCrossResult {
    const input: MacdInput = {
      period: {
        ...macdPeriod,
      },
      values,
    };
    const macdList = macd(input);

    return match(macdList);
  }
}
