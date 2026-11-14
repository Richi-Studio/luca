// Generado en cada build. Guarda la app para usarla sin conexión.
const CACHE = 'luca-mwfyenhu';
const FILES = ["./","./index.html","./manifest.webmanifest","./icons/icon-192.png","./icons/icon-512.png","./icons/badge-96.png","./icons/apple-touch-icon.png","./icons/icon.svg","./assets/inter-latin-ext-600-normal-D2bJ5OIk.woff2","./assets/inter-latin-600-normal-LgqL8muc.woff2","./assets/inter-latin-400-normal-C38fXH4l.woff2","./assets/inter-latin-ext-400-normal-C1nco2VV.woff2","./assets/inter-latin-700-normal-Yt3aPRUw.woff2","./assets/inter-latin-ext-700-normal-Ca8adRJv.woff2","./assets/inter-latin-ext-800-normal-DZJjya6U.woff2","./assets/inter-latin-800-normal-BYj_oED-.woff2","./assets/nunito-latin-800-normal-Dz8SOQK_.woff2","./assets/nunito-latin-ext-800-normal-CtU8tJOV.woff2","./assets/nunito-latin-ext-900-normal-Dllsvgjo.woff2","./assets/nunito-latin-900-normal-BVB1fGs6.woff2","./assets/index-Bj4_DFSb.css","./assets/index-Ceh5EbNT.js","./assets/cloud-CbnKw2m-.js","./assets/index.esm-DnoyZyWK.js"];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
// Avisos push (Firebase Cloud Messaging manda los datos; aquí se muestran).
self.addEventListener('push', (e) => {
  let m = {};
  try { m = e.data ? e.data.json() : {}; } catch (err) { m = {}; }
  const d = m.data || (m.notification ? { title: m.notification.title, body: m.notification.body } : m);
  if (!d || !d.title) return;
  e.waitUntil(self.registration.showNotification(d.title, { body: d.body || '', icon: 'icons/icon-192.png', badge: 'icons/badge-96.png', tag: d.tag || undefined, data: { url: d.url || '#/' }, lang: 'es-CO' }));
});
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const target = new URL((e.notification.data && e.notification.data.url) || '#/', self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
    const w = list.find((c) => c.url.startsWith(self.registration.scope));
    if (w) { w.focus(); return w.navigate(target).catch(() => {}); }
    return self.clients.openWindow(target);
  }));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    // Sin internet: la página guardada. Si algún servidor la entregó como redirección, el navegador no la acepta
    // para abrir la app, así que se usa la de la raíz ("./").
    e.respondWith(fetch(req).catch(() => caches.match('./index.html', { ignoreVary: true })
      .then((hit) => (hit && !hit.redirected ? hit : caches.match('./', { ignoreVary: true })))));
    return;
  }
  // ignoreVary: algunos servidores mandan "Vary: Origin" y los scripts de tipo módulo no coincidirían sin conexión.
  e.respondWith(caches.match(req, { ignoreVary: true }).then((hit) => hit || fetch(req).then((res) => {
    const copy = res.clone();
    if (res.ok) caches.open(CACHE).then((c) => c.put(req, copy));
    return res;
  })));
});
