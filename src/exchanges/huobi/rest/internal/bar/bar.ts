import { Config } from '../../../../../types';
import { request } from '../../../../helpers';
import { HttpMethod, RestResponse } from '../../../../types';
import { BarResponse, BarSourceResponse, PublicEndPoints, RestBarRequest, RestBarResponse, baseUrl } from '../../../types';
import { transform } from './helpers';
// tslint:disable-next-line:no-var-requires
const config: Config = require('config');

export class Bar {
  private readonly reqUrl: string;

  constructor() {
    this.reqUrl = `${baseUrl}${PublicEndPoints.Bar}`;
  }

  async fetch(req: RestBarRequest): Promise<RestBarResponse> {
    const res = <BarSourceResponse>await this.request(HttpMethod.GET, req);
    const bars: BarResponse[] = res.error ? [] : transform(res);

    return {
      bars: bars.reverse(),
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
