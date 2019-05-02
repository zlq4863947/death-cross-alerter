import { Config } from '../../../../../types';
import { request } from '../../../../helpers';
import { HttpMethod, RestResponse } from '../../../../types';
import { PublicEndPoints, RestSymbolResponse, SymbolSourceResponse, baseUrl } from '../../../types';
import { transform } from './helpers';
// tslint:disable-next-line:no-var-requires
const config: Config = require('config');

export class Symbol {
  private readonly reqUrl: string;

  constructor() {
    this.reqUrl = `${baseUrl}${PublicEndPoints.Symbol}`;
  }

  async fetch(): Promise<RestSymbolResponse> {
    const res = <SymbolSourceResponse>await this.request(HttpMethod.GET, {});
    const symbols: string[] = res.error ? [] : transform(res);

    return {
      symbols,
      error: res.error,
    };
  }

  protected async request(method: HttpMethod, data: any): Promise<RestResponse> {
    return request(method, this.reqUrl, {
      ...data,
      AccessKeyId: config.huobi.accessKey,
    });
  }
}
