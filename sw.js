// ═══════════════════════════════════════════
//  THE INTERNS HUB — SERVICE WORKER v2.0
// ═══════════════════════════════════════════
const CACHE_NAME = 'interns-hub-v2';
const STATIC_ASSETS = [
  '/the-interns-hub/',
  '/the-interns-hub/index.html',
  '/the-interns-hub/dashboard.html',
  '/the-interns-hub/interns.html',
  '/the-interns-hub/messages.html',
  '/the-interns-hub/announcements.html',
  '/the-interns-hub/admin.html',
  '/the-interns-hub/config.js',
  '/the-interns-hub/style.css',
  '/the-interns-hub/manifest.json',
  '/the-interns-hub/icon-192.png',
  '/the-interns-hub/icon-512.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Always fetch Supabase API calls from network
  if (url.hostname.includes('supabase.co')) {
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        }
        return response;
      }).catch(() => caches.match('/the-interns-hub/index.html'));
    })
  );
});
