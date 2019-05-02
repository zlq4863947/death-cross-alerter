import { Logger } from '@nestjs/common';

import { postTelegram } from '../../common';
import { DeathCross } from '../../signal';
import { Config } from '../../types';
import { BinanceRest } from './rest';
import { Resolution } from './types';

import moment = require('moment');

// tslint:disable-next-line:no-var-requires
const config: Config = require('config');

export class Pretrade {
  private readonly binanceRest: BinanceRest;
  private readonly deathCross: DeathCross;

  constructor(binanceRest: BinanceRest) {
    this.binanceRest = binanceRest;
    this.deathCross = new DeathCross();
  }

  async measure(period: Resolution): Promise<void> {
    try {
      let pairs = config.binance.pairs;
      if (config.binance.allPairs) {
        const res = await this.binanceRest.fetchSymbol();
        pairs = res.symbols;
      }
      Logger.log(`执行定时任务, time: ${period}`, 'binance');
      for (const pair of pairs) {
        const restBarResponse = await this.binanceRest.fetchBar({
          interval: period,
          symbol: pair,
          limit: 100,
        });
        if (restBarResponse.bars.length > 0) {
          const bars = restBarResponse.bars;
          Logger.log(`[${pair}][${period}]取得k线长度：${bars.length}`, 'binance');
          const closeList = bars.map((o) => o.close);
          // 查询是否macd死叉
          const deathCrossResult = this.deathCross.macd(closeList, config.binance.macd.period);

          if (deathCrossResult.result && deathCrossResult.data) {
            const lastBar = bars[bars.length - 1];
            const formattedBar = JSON.stringify(
              {
                time: moment(lastBar.closeTime).format(),
                open: lastBar.open,
                high: lastBar.high,
                low: lastBar.low,
                close: lastBar.close,
                volume: lastBar.volume,
              },
              null,
              2,
            );
            const macd = deathCrossResult.data;
            const formattedMacd = JSON.stringify(
              {
                macd: macd.MACD.toFixed(8),
                signal: macd.signal.toFixed(8),
                histogram: macd.histogram.toFixed(8),
              },
              null,
              2,
            );
            const msg = `[币安][${pair}][${period}]发生MACD死叉,K线:${formattedBar},MACD:${formattedMacd}`;
            Logger.log(`[${pair}][${period}]发送信号内容：${msg}`, 'binance');
            await postTelegram(config.binance.chatId, msg);
            continue;
          }
          Logger.log(`[${pair}][${period}]未满足预警信号！`, 'binance');
          continue;
        }
        Logger.error(`[${pair}][${period}]获取k线为空！！`, '', 'binance');
      }
    } catch (err) {
      Logger.error(`[${period}]定时任务[异常结束] ${err}`, '', 'binance');
    }
  }
}
