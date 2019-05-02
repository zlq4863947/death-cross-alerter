import Axios, { AxiosRequestConfig } from 'axios';
import { stringify } from 'qs';

import { HttpMethod, RestResponse } from './types';

export async function request(method: HttpMethod, reqUrl: string, data: any): Promise<RestResponse> {
  const req: AxiosRequestConfig = {
    method,
  };
  let query = '';
  if (method !== HttpMethod.GET) {
    req.data = data;
  } else {
    query = Object.keys(data).length !== 0 ? `?${stringify(data)}` : '';
  }
  const url = `${reqUrl}${query}`;

  try {
    const response = await Axios(url, req);

    return {
      data: response.data,
    };
  } catch (error) {
    return {
      data: {},
      error,
    };
  }
}
