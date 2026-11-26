const CACHE = 'planner-0abc36873a';
const FILES = ["./","assets/Expenses-d93ceec7.js","assets/Habits-ccc80ca2.js","assets/index-04481dc9.js","assets/index-9b4456f1.css","assets/Meals-033c42ec.js","assets/Notes-54adfa01.js","assets/Tasks-9f61bcfd.js","assets/vendor-date-e6735cc5.js","assets/vendor-icons-224ac3e2.js","assets/vendor-motion-c707c8ba.js","assets/vendor-query-d1926a67.js","assets/vendor-react-d8b80929.js","favicon.svg","icons/icon-180.png","icons/icon-192.png","icons/icon-512.png","icons.svg","index.html","manifest.webmanifest"];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, { cache: 'reload' })))).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return; // Gemini calls go straight to the network
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).catch(() => caches.match('./index.html'))));
});
