import { Job } from 'node-schedule';

/**
 * @class
 * @classdesc Cron表达式定时器
 *
 * @param {string=}[cron='30 15 * * *'] Cron表达式<br/>
 **    *    *    *    *    *<br/>
 *┬    ┬    ┬    ┬    ┬    ┬<br/>
 *│    │    │    │    │    └ 星期 (0 - 7) (0 or 7 为星期日)<br/>
 *│    │    │    │    └───── 月 (1 - 12)<br/>
 *│    │    │    └────────── 天 (1 - 31)<br/>
 *│    │    └─────────────── 小时 (0 - 23)<br/>
 *│    └──────────────────── 分钟 (0 - 59)<br/>
 *└───────────────────────── 秒 (0 - 59, 可选)
 */
export class Scheduler {
  static min(minute: number, fn: () => void, start?: Date): Job {
    const job = new Job(fn);
    if (start) {
      job.runOnDate(start);
    }
    job.schedule(`*/${minute} * * * *`);

    return job;
  }

  static day(fn: () => void, start?: Date): Job {
    const job = new Job(fn);
    if (start) {
      job.runOnDate(start);
    }
    job.schedule('1 0 0 * * *');

    return job;
  }
}

/**
 * Get some time in the future
 * @param param
 *
 * eg1:
 * nowTime: 2019-04-16 18:43
 * const futureTime = getFutureTime({minute: 0, hour: 1});
 * futureTime: 2019-04-16 19:00
 *
 * eg2:
 * nowTime: 2019-04-16 18:43
 * const futureTime = getFutureTime({minute: 10, hour: 0});
 * futureTime: 2019-04-16 18:50
 *
 * eg3:
 * nowTime: 2019-04-16 18:43
 * const futureTime = getFutureTime({minute: 30, hour: 0});
 * futureTime: 2019-04-16 19:00
 */
export function getFutureTime(param: { minute: number; hour: number }): Date {
  const date = new Date();
  if (param.hour) {
    // 向上取整
    const floorHour = Math.floor(date.getUTCHours() / param.hour) + 1;
    date.setUTCHours(floorHour * param.hour);
  }
  let minute = 0;
  if (param.minute) {
    // 向上取整
    const floorMinute = Math.floor(date.getUTCMinutes() / param.minute) + 1;
    minute = floorMinute * param.minute;
  }
  date.setUTCMinutes(minute);
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date;
}
