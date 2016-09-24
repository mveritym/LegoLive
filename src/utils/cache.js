const cache = {};

const clearCacheFn = (key) => () => {
  clearInterval(cache[key].intervalID);
  delete cache.key;
}

const cacheItem = (key, item) => {
  const intervalID = setInterval(clearCacheFn(key), 3600000);
  cache[key] = {
    item,
    intervalID
  };
};

const isCached = (key) => Object.keys(cache).contains(key);

export {
  cacheItem,
  isCached
}
