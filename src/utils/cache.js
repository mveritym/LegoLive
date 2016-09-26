export function Cache(timeout) {
  this.timeout = timeout;

  this.clearKey = (key) => () => {
    clearInterval(localStorage.getItem(key).intervalID);
    localStorage.removeItem(key);
  };

  this.set = (key, item) => {
    const intervalID = setInterval(this.clearKey(key), this.timeout);
    localStorage.setItem(key, JSON.stringify({
      item,
      intervalID
    }));
  };

  this.get = (key) => {
    const parsedData = JSON.parse(localStorage.getItem(key));
    return parsedData ? parsedData.item : null;
  }
}

const cache = new Cache(3600000);
export default cache;
