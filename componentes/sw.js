var CACHE_NAME = 'v1_cache_pwa',
    urlsToCache = ['./', './script.js', './img/logo.png', './img/favicon.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
    return cache.addAll(urlsToCache).then(function () {
      return self.skipWaiting();
    });
  }).catch(function (err) {
    return console.log('Falló registro de cache', err);
  }));
});

self.addEventListener('activate', function (e) {
  var cacheWhitelist = [CACHE_NAME];

  e.waitUntil(caches.keys().then(function (cacheNames) {
    return Promise.all(cacheNames.map(function (cacheName) {
      if (cacheWhitelist.indexOf(cacheName) === -1) {
        return caches.delete(cacheName);
      }
    }));
  }).then(function () {
    return self.clients.claim();
  }));
});

self.addEventListener('fetch', function (e) {
  e.respondWith(caches.match(e.request).then(function (res) {
    if (res) {
      return res;
    }
    return fetch(e.request);
  }));
});

getAllPosts().then(function (response) {
  console.log(response);
}).catch(function (e) {
  console.log(e);
});