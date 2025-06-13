// Fixed Service Worker for PWA

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "pwabuilder-page-v1";
const OFFLINE_PAGE = "/app/offline.html"; // Make sure this file exists!

// Precache assets (add real files you want cached for offline use)
const PRECACHE_ASSETS = [
  "/",
  "/app/app.webmanifest",
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

// Activate: take control ASAP
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Fetch: Serve from cache, fallback to network, then to offline page
self.addEventListener('fetch', event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Optionally update cache
        return response;
      })
      .catch(async () => {
        const cache = await caches.open(CACHE);
        const cached = await cache.match(event.request);
        return cached || cache.match(OFFLINE_PAGE);
      })
  );
});