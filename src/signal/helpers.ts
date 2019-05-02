import { MacdOutput } from '../indicator/moving-average';
import { DeathCrossResult } from './death-cross';

export function match(macdList: MacdOutput[]): DeathCrossResult {
  if (macdList.length === 0) {
    return {
      result: false,
    };
  }
  const resList: DeathCrossResult[] = [];

  for (const o of macdList) {
    const deathCrossResult: DeathCrossResult = {
      result: false,
      data: o,
    };
    if (o.MACD > 0 && o.MACD < o.signal) {
      deathCrossResult.result = true;
    }
    resList.push(deathCrossResult);
  }
  let matchRes: DeathCrossResult = {
    result: false,
  };
  const lastData = resList[resList.length - 1];
  const last2Data = resList[resList.length - 2];
  if (lastData.result && !last2Data.result) {
    matchRes = lastData;
  }

  return matchRes;
}
