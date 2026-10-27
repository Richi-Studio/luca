// Generado en cada build. Guarda la app para usarla sin conexión.
const CACHE = 'luca-mvq9bofh';
const FILES = ["./","./index.html","./manifest.webmanifest","./icons/icon-192.png","./icons/icon-512.png","./icons/apple-touch-icon.png","./icons/icon.svg","./assets/inter-latin-400-normal-C38fXH4l.woff2","./assets/inter-latin-ext-400-normal-C1nco2VV.woff2","./assets/inter-latin-ext-800-normal-DZJjya6U.woff2","./assets/inter-latin-800-normal-BYj_oED-.woff2","./assets/inter-latin-600-normal-LgqL8muc.woff2","./assets/inter-latin-ext-700-normal-Ca8adRJv.woff2","./assets/inter-latin-ext-600-normal-D2bJ5OIk.woff2","./assets/nunito-latin-ext-800-normal-CtU8tJOV.woff2","./assets/nunito-latin-800-normal-Dz8SOQK_.woff2","./assets/inter-latin-700-normal-Yt3aPRUw.woff2","./assets/nunito-latin-ext-900-normal-Dllsvgjo.woff2","./assets/nunito-latin-900-normal-BVB1fGs6.woff2","./assets/index-wEK7GFUl.css","./assets/index-CnhJ03Xl.js","./assets/cloud-CArExQok.js"];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).catch(() => caches.match('./index.html', { ignoreVary: true })));
    return;
  }
  // ignoreVary: algunos servidores mandan "Vary: Origin" y los scripts de tipo módulo no coincidirían sin conexión.
  e.respondWith(caches.match(req, { ignoreVary: true }).then((hit) => hit || fetch(req).then((res) => {
    const copy = res.clone();
    if (res.ok) caches.open(CACHE).then((c) => c.put(req, copy));
    return res;
  })));
});
