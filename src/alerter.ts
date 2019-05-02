import { Logger } from '@nestjs/common';

import { Binance, Huobi, Okex } from './exchanges';
import { Config, SupportedExchange } from './types';

// tslint:disable-next-line:no-var-requires
const config: Config = require('config');

export class Alerter {
  private readonly binance: Binance.BinanceRest;
  private readonly binancePretrade: Binance.Pretrade;
  private readonly huobi: Huobi.HuobiRest;
  private readonly huobiPretrade: Huobi.Pretrade;
  private readonly okex: Okex.OkexRest;
  private readonly okexPretrade: Okex.Pretrade;

  constructor() {
    this.binance = new Binance.BinanceRest();
    this.binancePretrade = new Binance.Pretrade(this.binance);
    this.huobi = new Huobi.HuobiRest();
    this.huobiPretrade = new Huobi.Pretrade(this.huobi);
    this.okex = new Okex.OkexRest();
    this.okexPretrade = new Okex.Pretrade(this.okex);
  }

  async start(): Promise<void> {
    const exchanges = config.alerter.exchanges;
    if (!exchanges || exchanges.length === 0) {
      Logger.error('请配置需要检测信号的交易所！');

      return;
    }
    for (const exchange of exchanges) {
      this.runSchedule(exchange);
    }
  }

  private runSchedule(exchange: SupportedExchange): void {
    switch (exchange) {
      case SupportedExchange.Binance: {
        const periods = config.binance.periods as Binance.Resolution[];
        for (const period of periods) {
          const fn = async () => {
            await this.binancePretrade.measure(period);
          };
          Binance.runSchedule(period, fn);
        }
        break;
      }
      case SupportedExchange.Huobi: {
        const periods = config.huobi.periods as Huobi.Resolution[];
        for (const period of periods) {
          const fn = async () => {
            await this.huobiPretrade.measure(period);
          };
          Huobi.runSchedule(period, fn);
        }
        break;
      }
      case SupportedExchange.Okex: {
        const periods = config.okex.periods as Okex.Resolution[];
        for (const period of periods) {
          const fn = async () => {
            await this.okexPretrade.measure(period);
          };
          Okex.runSchedule(period, fn);
        }
        break;
      }
      default: {
        Logger.error(`尚未支持的交易所: ${exchange}`);
      }
    }
  }
}
