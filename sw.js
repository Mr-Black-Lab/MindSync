const CACHE = 'planner-1159812ad8';
const FILES = ["./","assets/Expenses-300dba65.js","assets/Habits-06121a61.js","assets/index-af37a9d2.js","assets/index-ec5060de.css","assets/Meals-4029a2a9.js","assets/Notes-6d261ed8.js","assets/Tasks-87d1b792.js","assets/vendor-date-e6735cc5.js","assets/vendor-icons-224ac3e2.js","assets/vendor-motion-c707c8ba.js","assets/vendor-query-d1926a67.js","assets/vendor-react-d8b80929.js","favicon.svg","icons/icon-180.png","icons/icon-192.png","icons/icon-512.png","icons.svg","index.html","manifest.webmanifest"];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, { cache: 'reload' })))).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return; // Gemini calls go straight to the network
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).catch(() => caches.match('./index.html'))));
});
