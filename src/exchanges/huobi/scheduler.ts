import { Logger } from '@nestjs/common';
import * as moment_ from 'moment';

import { Scheduler, getFutureTime } from '../../common';
import { Resolution } from './types';

const moment = moment_;

/**
 * 执行任务计划
 * @param period
 * @param fn
 */
export function runSchedule(period: string, fn: () => void): void {
  const time = getPeriodMinute(period);

  switch (period) {
    case Resolution.min:
    case Resolution.min5:
    case Resolution.min15:
    case Resolution.min30: {
      if (time) {
        Scheduler.min(time, fn);
      }
      break;
    }
    case Resolution.hour: {
      const formattedTime = getFutureTime({ hour: 1, minute: 0 });
      Logger.log(`每小时计划任务，将在${moment(formattedTime).format()}开始执行！`, 'huobi');
      if (time) {
        Scheduler.min(time, fn, formattedTime);
      }
      break;
    }
    case Resolution.day: {
      Scheduler.day(fn);
      break;
    }
    default: {
      Logger.warn(`未定义的计划任务时间:${period}`, 'huobi');
    }
  }
}

/**
 * 解析周期时间为分钟数
 * @param period
 */
function getPeriodMinute(period: string): number | undefined {
  const resolution = Object.values(Resolution).find((o) => o === period) as Resolution;
  switch (resolution) {
    case Resolution.min: {
      return 1;
    }
    case Resolution.min5: {
      return 5;
    }
    case Resolution.min15: {
      return 15;
    }
    case Resolution.min30: {
      return 30;
    }
    case Resolution.hour: {
      return 60;
    }
    default: {
      return undefined;
    }
  }
}
