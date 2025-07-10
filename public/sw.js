const CACHE_NAME = 'cyberbrein-cache-v1';

// List of all important pages to cache
const PAGES_TO_CACHE = [
  '/',
  '/game',
  '/encryption-lessons',
  '/flags',
  '/quiz',
  '/emoji-code',
  '/spot-differences',
  '/leaderboard',
  '/admin',
  '/word-shuffle',
  '/hint',
  '/EndPage'
];

// List of all data files to cache
const DATA_FILES_TO_CACHE = [
  '/src/codes.js',
  '/src/encryptionLessons.js',
  '/src/flags.js',
  '/src/quizzes.js',
  '/src/encryptions.js',
  '/src/leaderboard.js'
];

// List of API endpoints to cache
const API_ENDPOINTS_TO_CACHE = [
  '/api/codes',
  '/api/encryption-lessons',
  '/api/flags',
  '/api/quizzes',
  '/api/encryptions',
  '/api/leaderboard'
];

// List of static files to cache
const STATIC_FILES_TO_CACHE = [
  '/manifest.json',
  '/favicon.ico',
  '/cyberbrein-logo.png',
  '/morse.wav',
  '/icon-192x192.png',
  '/icon-500x500.png'
];

// Skip caching for development mode
const isDevelopment = self.location.hostname === 'localhost' || self.location.hostname === '127.0.0.1';

// Install event - cache assets
self.addEventListener('install', (event) => {
  if (isDevelopment) {
    console.log('Skipping cache in development mode');
    return;
  }

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache opened successfully');
        
        // Cache all important pages, data files, API endpoints, and static files
        const urlsToCache = [...PAGES_TO_CACHE, ...DATA_FILES_TO_CACHE, ...API_ENDPOINTS_TO_CACHE, ...STATIC_FILES_TO_CACHE];
        
        return Promise.all(
          urlsToCache.map(url => 
            fetch(url)
              .then(response => {
                if (!response.ok) {
                  throw new Error(`Failed to cache ${url}`);
                }
                console.log(`Successfully cached ${url}`);
                return cache.put(url, response);
              })
              .catch(error => {
                console.error(`Failed to cache ${url}:`, error);
              })
          )
        );
      })
  );
});

// Fetch event - serve from cache if available
self.addEventListener('fetch', (event) => {
  // Skip caching in development mode
  if (isDevelopment) {
    return;
  }

  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip WebSocket connections
  if (event.request.url.startsWith('ws://') || event.request.url.startsWith('wss://')) {
    console.log('Skipping WebSocket connection:', event.request.url);
    return;
  }

  // Skip Next.js specific requests in development
  if (event.request.url.includes('_next') || event.request.url.includes('webpack-hmr')) {
    console.log('Skipping Next.js development request:', event.request.url);
    return;
  }

  // Handle API requests
  if (API_ENDPOINTS_TO_CACHE.some(endpoint => event.request.url.includes(endpoint))) {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            console.log('Serving cached API response:', event.request.url);
            return response;
          }
          return fetch(event.request)
            .then(response => {
              if (!response.ok) {
                throw new Error(`Failed to fetch ${event.request.url}`);
              }
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                  console.log('Cached API response:', event.request.url);
                });
              return response;
            })
            .catch(error => {
              console.error('Error fetching API:', error);
              // Return a basic offline response for API requests
              return new Response(JSON.stringify({ error: 'offline' }), {
                headers: { 'Content-Type': 'application/json' }
              });
            });
        })
    );
    return;
  }

  // Handle static file requests
  if (STATIC_FILES_TO_CACHE.some(file => event.request.url.endsWith(file))) {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            console.log('Serving cached static file:', event.request.url);
            return response;
          }
          return fetch(event.request)
            .then(response => {
              if (!response.ok) {
                throw new Error(`Failed to fetch ${event.request.url}`);
              }
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                  console.log('Cached static file:', event.request.url);
                });
              return response;
            })
            .catch(error => {
              console.error('Error fetching static file:', error);
              return new Response('Offline', { status: 503 });
            });
        })
    );
    return;
  }

  // Handle navigation requests (pages)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone the response
          const responseToCache = response.clone();
          
          // Cache the response
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
              console.log('Cached navigation response:', event.request.url);
            });
          
          return response;
        })
        .catch(() => {
          // If fetch fails, try to get from cache
          return caches.match(event.request)
            .then((response) => {
              if (response) {
                console.log('Serving cached navigation response:', event.request.url);
                return response;
              }
              // If not in cache, return the home page
              console.log('Falling back to home page for:', event.request.url);
              return caches.match('/');
            });
        })
    );
    return;
  }

  // Handle RSC requests specifically
  if (event.request.url.includes('?_rsc=')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone the response
          const responseToCache = response.clone();
          
          // Cache the response
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
              console.log('Cached RSC response:', event.request.url);
            });
          
          return response;
        })
        .catch(() => {
          // If fetch fails, try to get from cache
          return caches.match(event.request)
            .then((response) => {
              if (response) {
                console.log('Serving cached RSC response:', event.request.url);
                return response;
              }
              // If not in cache, return a basic offline response
              return new Response(JSON.stringify({ error: 'offline' }), {
                headers: { 'Content-Type': 'application/json' }
              });
            });
        })
    );
    return;
  }

  // Handle regular requests (assets, API calls, etc.)
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone the response
        const responseToCache = response.clone();
        
        // Cache the response
        caches.open(CACHE_NAME)
          .then((cache) => {
            cache.put(event.request, responseToCache);
            console.log('Cached regular response:', event.request.url);
          });
        
        return response;
      })
      .catch(() => {
        // If fetch fails, try to get from cache
        return caches.match(event.request)
          .then((response) => {
            if (response) {
              console.log('Serving cached regular response:', event.request.url);
              return response;
            }
            // If not in cache, return a basic offline response
            return new Response('Offline', { status: 503 });
          });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  if (isDevelopment) {
    return;
  }

  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 