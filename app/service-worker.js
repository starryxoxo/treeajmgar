// service-worker.js

self.addEventListener("install", (event) => {
  console.log("Service Worker installing.");
  self.skipWaiting(); // Optional: activate worker immediately
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activated.");
});

self.addEventListener("fetch", (event) => {
  // Optional: Add offline caching logic
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  const keepCaches = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.map((name) => {
          if (!keepCaches.includes(name)) {
            return caches.delete(name);
          }
        })
      )
    )
  );
});
