export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface ErrorResponse {
  error?: Error;
}

export interface RestResponse extends ErrorResponse {
  data: { [attr: string]: any };
}
