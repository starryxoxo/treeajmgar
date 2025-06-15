// Fixed Service Worker for PWA

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "pwabuilder-page-v1";
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

// Activate: take control ASAP + enable navigation preload + clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.enable();
      }
      // Delete old caches
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

// Fetch: Serve from cache, fallback to network, then to offline page
self.addEventListener('fetch', event => {
  if (event.request.method !== "GET") return;

  // Use navigation preload if available for navigation requests
  if (event.preloadResponse && event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        const preloadResp = await event.preloadResponse;
        if (preloadResp) return preloadResp;
        return fetchThenCacheOrOffline(event);
      })()
    );
  } else {
    event.respondWith(fetchThenCacheOrOffline(event));
  }
});

async function fetchThenCacheOrOffline(event) {
  try {
    const response = await fetch(event.request);
    // Optionally update cache here if desired
    return response;
  } catch (e) {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(event.request);
    return cached || cache.match(OFFLINE_PAGE);
  }
}

// 5. Periodic Background Sync (if supported)
self.addEventListener('periodicsync', event => {
  if (event.tag === 'content-sync') {
    event.waitUntil(
      prefetchContent()
    );
  }
});

// 7. Content Prefetching (called by periodic sync or can be called elsewhere)
async function prefetchContent() {
  const urlsToPrefetch = [
    "/"
  ];
  const cache = await caches.open(CACHE);
  await Promise.all(urlsToPrefetch.map(async url => {
    try {
      const res = await fetch(url, {cache: "reload"});
      if (res.ok) await cache.put(url, res);
    } catch (e) {
      // Ignore fetch errors (offline, etc.)
    }
  }));
}

// Optional: Listen for messages to trigger manual update/prefetch
self.addEventListener('message', event => {
  if (event.data === 'prefetch') {
    prefetchContent();
  }
});

// For periodic background sync registration (PUT THIS IN YOUR MAIN JS, NOT THE SW!):
// if ('serviceWorker' in navigator && 'PeriodicSyncManager' in window) {
//   navigator.serviceWorker.ready.then(swReg => {
//     swReg.periodicSync.register('content-sync', {minInterval: 24 * 60 * 60 * 1000}); // daily
//   });
// }
// If not supported, you could fallback to setInterval in your page and postMessage() 'prefetch' to the SW.