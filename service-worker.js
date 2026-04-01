self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open('portfolio-v1').then(cache => {
      return cache.addAll([
        '/',
        '/portfolio.html',
        '/style.css',
        '/manifest.json'
      ]);
    })
  );
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(resp => resp || fetch(evt.request))
  );
});