import { Cache } from '../../src/utils/cache';
import mockLocalStorage from '../mocks/localStorage';

describe('cache', () => {
  let cache, timeout;
  mockLocalStorage();

  beforeEach(() => {
    jest.useFakeTimers();
    timeout = 1000;
    cache = new Cache(timeout);
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should add an item to the cache', () => {
    cache.clearKey = jest.fn();
    cache.set('test', 123);
    expect(setInterval.mock.calls.length).toBe(1);
    expect(setInterval.mock.calls[0]).toEqual([cache.clearKey('test'), timeout]);
    expect(cache.clearKey).toBeCalledWith('test');
  });

  it('should clear the cache', () => {
    cache.set('test', 123);
    jest.runOnlyPendingTimers();
    expect(clearInterval).toBeCalled();
  })
});
