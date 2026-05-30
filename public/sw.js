const CACHE = 'marc-cv-v1';
const STATIC = '/_next/static/';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', (e) => {
  const { request } = e;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;

  // Network-only: API chat
  if (url.pathname.startsWith('/api/')) return;

  // Cache-first: Next.js static assets
  if (url.pathname.startsWith(STATIC)) {
    e.respondWith(
      caches.open(CACHE).then((cache) =>
        cache.match(request).then(
          (cached) => cached ?? fetch(request).then((res) => { cache.put(request, res.clone()); return res; })
        )
      )
    );
    return;
  }

  // Network-first: everything else
  e.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});
