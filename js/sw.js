const myCache = 'static cache v1';
let cachedURLs = [
  '/',
  '/restaurant.html',
  '/css/',
  '/data/restaurants.json',
  '/img',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js'
];

// Open cache once Service Worker is installed

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(myCache)
      .then((cache) => {
        console.log('Cache opened!');
        return cache.addAll(cachedURLs);
      })
  );
});

// Respond to fetch events with cached items if possible

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
