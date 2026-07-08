// v6 - nukes all caches and force-reloads all clients on activation
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({ type: 'window', includeUncontrolled: true }))
      .then(clients => Promise.all(clients.map(c => c.navigate(c.url))))
  );
});

// No fetch handler: every request goes directly to network - blank page impossible
