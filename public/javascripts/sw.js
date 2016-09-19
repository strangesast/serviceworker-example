// serviceworker
var whitelist = [];
const CACHE_NAME = 'sw-test';
var paths = [
  '/'
];

self.addEventListener('install', function(e) {
  console.log('installing...');
  return e.waitUntil(caches.open(CACHE_NAME).then(function(cache) {
    return cache.addAll(paths);
  }));
});

self.addEventListener('activate', function(e) {
  console.log('activating...');

  // remove old caches
  return e.waitUntil(caches.keys().then(function(keys) {
    return Promise.all(keys.map(function(key) {
      if(whitelist.indexOf(key) === -1) {
        return caches.delete(key);
      }
    }));
  }));
});

self.addEventListener('message', function(e) {
  console.log('message!', e.data);
  if(e.data.type == 'ping') {
    e.ports[0].postMessage(e.data.message);
  }
});

self.addEventListener('fetch', function(e) {
});
