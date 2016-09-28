export function Cache(timeout) {
  this.timeout = timeout;

  this.clearKey = (key) => () => {
    clearInterval(JSON.parse(localStorage.getItem(key)).intervalID);
    localStorage.removeItem(key);
  };

  this.set = (key, item) => {
    const timestamp = Date.now();
    const intervalID = setInterval(this.clearKey(key), this.timeout);
    localStorage.setItem(key, JSON.stringify({
      item,
      intervalID,
      timestamp
    }));
  };

  this.get = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data).item : undefined;
  }

  this.init = () => {
    [...Array(localStorage.length).keys()].forEach(i => {
      const key = localStorage.key(i);
      const {item, timestamp} = JSON.parse(localStorage.getItem(key));
      const intervalID = setInterval(this.clearKey(key), Date.now() - timestamp);
      localStorage.setItem(key, JSON.stringify({
        item,
        intervalID
      }));
    });
  }
}

const cache = new Cache(5000); // 3600000
export default cache;
