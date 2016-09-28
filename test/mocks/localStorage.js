export default function mockLocalStorage() {
  const localStorageMock = (function() {
    let store = {};
    let length = 0;
    return {
      getItem: jest.fn(key => {
        return store[key];
      }),
      setItem: jest.fn((key, value) => {
        store[key] = value.toString();
        length = Object.keys(store).length;
      }),
      removeItem: jest.fn(key => {
        delete store[key];
        length = Object.keys(store).length;
      }),
      clear: jest.fn(() => {
        store = {};
        length = 0;
      }),
      key: jest.fn(n => {
        return Object.keys(store)[n];
      })
    };
  })();

  Object.defineProperty(window, 'localStorage', { value: localStorageMock });
}
