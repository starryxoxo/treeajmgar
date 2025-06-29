const CACHE = "v4";
const OFFLINE_PAGE = "/app/offline.html";
const PRECACHE_ASSETS = [
  "/",
  "/app/swrn.png",
  OFFLINE_PAGE
];

// Install: cache required assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: delete old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE) return caches.delete(name);
        })
      );
      await self.clients.claim();
    })()
  );
});

// Fetch: always try network, cache result, fallback to cache, then offline page
self.addEventListener('fetch', event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);
      try {
        const networkResponse = await fetch(event.request);
        // Cache every successful network response for future offline use
        if (networkResponse && networkResponse.status === 200) {
          cache.put(event.request, networkResponse.clone());
        }
        return networkResponse;
      } catch (error) {
        // Network failed, try cache
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
        // Not in cache, show offline fallback for navigations
        if (event.request.mode === 'navigate') {
          return cache.match(OFFLINE_PAGE);
        }
      }
    })()
  );
});