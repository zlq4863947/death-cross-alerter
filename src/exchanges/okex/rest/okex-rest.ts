import { RestBarRequest, RestBarResponse, RestSymbolResponse } from '../types';
import { Bar, Symbol } from './internal';

export class OkexRest {
  private readonly bar: Bar;
  private readonly symbol: Symbol;

  constructor() {
    this.bar = new Bar();
    this.symbol = new Symbol();
  }

  async fetchBar(request: RestBarRequest): Promise<RestBarResponse> {
    return this.bar.fetch(request);
  }

  async fetchSymbol(): Promise<RestSymbolResponse> {
    return this.symbol.fetch();
  }
}
