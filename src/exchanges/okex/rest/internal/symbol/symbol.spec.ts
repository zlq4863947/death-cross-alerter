import { Symbol } from './symbol';

describe('Okex Rest Symbol', () => {
  const symbol = new Symbol();

  it('fetch symbol', async () => {
    const res = await symbol.fetch();
    expect(res.symbols.length).toBeGreaterThan(50);
    expect(res.error).toBeUndefined();
  });
});
