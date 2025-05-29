const cache = new Map();

export default {
  get(key) {
    return cache.get(key);
  },
  set(key, value) {
    cache.set(key, value);
  },
  clear() {
    cache.clear();
  },
};
