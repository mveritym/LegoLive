export default function Cache(timeout) {
  this.timeout = timeout;

  const cache = {};

  this.clearKey = (key) => () => {
    clearInterval(cache[key].intervalID);
    delete cache[key];
  };

  this.set = (key, item) => {
    const intervalID = setInterval(this.clearKey(key), this.timeout);
    cache[key] = {
      item,
      intervalID
    };
  };

  this.get = (key) => cache[key].item;
  this.isCached = (key) => Object.keys(cache).indexOf(key) !== -1;
}
