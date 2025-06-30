// sw.js

self.addEventListener('install', (event) => {
  // Activate immediately
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    // Unregister this service worker
    self.registration.unregister().then(() => {
      // Get all clients (open tabs/windows)
      return self.clients.matchAll();
    }).then((clients) => {
      // Reload each client to refresh without service worker
      clients.forEach(client => {
        if (client instanceof WindowClient) {
          client.navigate(client.url);
        }
      });
    }).then(() => {
      // Clear all caches
      return caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      });
    })
  );
});
