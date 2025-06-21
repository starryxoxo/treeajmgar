const CACHE = "pwabuilder-page-v2";
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

// Fetch: cache all GET requests, revalidate, delete outdated cache
self.addEventListener('fetch', event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);

      // Try to fetch from network
      try {
        const networkResponse = await fetch(event.request);

        // Compare with cached response
        const cachedResponse = await cache.match(event.request);

        // If the new response is different or not cached, update cache
        if (!cachedResponse || !(await compareResponses(networkResponse, cachedResponse))) {
          await cache.put(event.request, networkResponse.clone());
        }
        return networkResponse;
      } catch (err) {
        // Network failed: try to serve from cache
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
        return cache.match(OFFLINE_PAGE);
      }
    })()
  );
});

// Helper: Compare two responses (by ETag or content)
async function compareResponses(resp1, resp2) {
  if (!resp1 || !resp2) return false;

  // Try ETag header first
  const etag1 = resp1.headers.get('ETag');
  const etag2 = resp2.headers.get('ETag');
  if (etag1 && etag2) return etag1 === etag2;

  // Fallback: compare bodies
  const b1 = await resp1.clone().arrayBuffer();
  const b2 = await resp2.clone().arrayBuffer();
  if (b1.byteLength !== b2.byteLength) return false;
  for (let i = 0; i < b1.byteLength; ++i) {
    if (new Uint8Array(b1)[i] !== new Uint8Array(b2)[i]) return false;
  }
  return true;
}