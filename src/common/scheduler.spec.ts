import { getFutureTime } from './scheduler';

describe('scheduler', () => {
  describe('getFutureTime function', () => {
    // tslint:disable-next-line
    const RealDate = Date;
    beforeAll(() => {
      (<any>global).Date = jest.fn(() => new RealDate('2019-04-16 18:43'));
    });
    afterAll(() => {
      (<any>global).Date = RealDate;
    });
    it('get 1 hour priod time', async () => {
      /*
       * eg1:
       * nowTime: 2019-04-16 18:43
       * const futureTime = getFutureTime({minute: 0, hour: 1});
       * futureTime: 2019-04-16 19:00
       */
      const res = getFutureTime({
        minute: 0,
        hour: 1,
      });
      expect(res).toEqual(new RealDate('2019-04-16 19:00'));
    });
    it('get 10 minute priod time', async () => {
      /*
       * eg1:
       * nowTime: 2019-04-16 18:43
       * const futureTime = getFutureTime({minute: 10, hour: 0});
       * futureTime: 2019-04-16 18:50
       */
      const res = getFutureTime({
        minute: 10,
        hour: 0,
      });
      expect(res).toEqual(new RealDate('2019-04-16 18:50'));
    });
    it('get 30 minute priod time', async () => {
      /*
       * eg1:
       * nowTime: 2019-04-16 18:43
       * const futureTime = getFutureTime({minute: 30, hour: 0});
       * futureTime: 2019-04-16 19:00
       */
      const res = getFutureTime({
        minute: 30,
        hour: 0,
      });
      expect(res).toEqual(new RealDate('2019-04-16 19:00'));
    });
  });
});
