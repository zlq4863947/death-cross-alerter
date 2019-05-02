import { SymbolSourceResponse } from '../../../types';

/**
 * transform raw rest data to SymbolSourceResponse
 * @param source raw rest data
 */
export function transform(source: SymbolSourceResponse): string[] {
  const symbols: string[] = [];

  for (const item of source.data) {
    symbols.push(item.symbol);
  }

  return symbols;
}
