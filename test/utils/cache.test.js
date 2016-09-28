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
    localStorage.clear();
  });

  describe('adding an item to the cache', () => {
    afterEach(() => {
      localStorage.clear();
    });

    it('should set an interval', () => {
      cache.clearKey = jest.fn();
      cache.set('test', 123);
      expect(setInterval.mock.calls.length).toBe(1);
      expect(setInterval.mock.calls[0]).toEqual([cache.clearKey('test'), timeout]);
    });

    it('should set an item in localStorage', () => {
      const intervalID = 'mock interval';
      const timestamp = 'fake date';

      setInterval.mockReturnValue(intervalID);
      const oldDateNow = Date.now;
      Date.now = jest.fn().mockReturnValue(timestamp);

      cache.set('test', 123);

      expect(localStorage.setItem).toBeCalledWith('test', JSON.stringify({
        item: 123,
        intervalID,
        timestamp
      }));

      Date.now = oldDateNow;
    })
  });

  describe('clearing an item from the cache', () => {
    const key = 'test';
    const intervalID = 1;

    beforeEach(() => {
      localStorage.setItem(key, JSON.stringify({
        item: 123,
        intervalID,
        weird: true
      }));
    });

    afterEach(() => {
      localStorage.clear();
    });

    it('should call clearInterval', () => {
      cache.clearKey(key)();
      expect(clearInterval).toBeCalledWith(intervalID);
    });

    it('should clear the item from localStorage', () => {
      cache.clearKey(key)();
      expect(localStorage.getItem(key)).toBeUndefined();
    });
  });

  describe('getting an item from the cache', () => {
    const key = 'test';
    const item = 123;

    beforeEach(() => {
      localStorage.setItem(key, JSON.stringify({
        item,
        intervalID: 1
      }));
    });

    it('returns an item if it exists', () => {
      expect(cache.get(key)).toBe(item);
    });

    it('returns null if the item is not in the cache', () => {
      expect(cache.get('not a key')).toBeUndefined();
    });
  });

  describe('initializing the cache', () => {
    it('sets an interval equal to the diff of the current time and the item\'s timestamp', () => {
      const key = 'test';
      const item = 123;
      const timestamp = Date.now();

      localStorage.setItem(key, JSON.stringify({
        item,
        timestamp
      }));

      const fakeNow = timestamp + 100;
      const oldDateNow = Date.now;
      Date.now = jest.fn().mockReturnValue(fakeNow);

      cache.clearKey = jest.fn();
      cache.init();

      expect(setInterval).toBeCalledWith(cache.clearKey(key), fakeNow - timestamp);
      Date.now = oldDateNow;
    })
  });
});
