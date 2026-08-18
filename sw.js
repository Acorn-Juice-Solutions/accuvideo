const CACHE_NAME = 'accuvideo-v44';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/thanks.html',
  '/assets/css/style.css?v=32',
  '/assets/js/main.min.js?v=41',
  '/assets/img/AccuVideo_Logo.png',
  '/assets/img/favicon.ico',
  '/assets/videos/demo-poster.jpg',
  '/assets/videos/AccuVideo_Horizontal_cover.png',
  '/assets/videos/AccuVideo_Horizontal_cover_en.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ).then(() => self.clients.claim())
    )
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    return;
  }

  const requestURL = new URL(event.request.url);
  if (requestURL.origin !== self.location.origin) {
    return;
  }

  const isMediaRequest = event.request.destination === 'video' || event.request.headers.has('range');
  if (isMediaRequest) {
    event.respondWith(fetch(event.request));
    return;
  }

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request, { cache: 'reload' })
        .then(response => {
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
          return response;
        })
        .catch(() => caches.match(event.request).then(hit => hit || caches.match('/index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const requestClone = event.request.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(requestClone, networkResponse.clone()));
        }
        return networkResponse;
      });
    })
  );
});
