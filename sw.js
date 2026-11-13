// ATÖLYE — service worker: çevrimdışı açılış + push bildirimleri
const SURUM = 'atolye-v1';
const KABUK = ['./', './index.html', './config.js', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SURUM).then(c => c.addAll(KABUK)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k !== SURUM).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Önce internetten dene (hep en güncel sürüm), olmazsa önbellekten aç.
// Supabase ve diğer sitelere giden isteklere hiç karışma.
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then(cevap => {
      if (cevap.ok) { const kopya = cevap.clone(); caches.open(SURUM).then(c => c.put(e.request, kopya)); }
      return cevap;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('./index.html')))
  );
});

// Sunucudan (Supabase Edge Function) gelen bildirim
self.addEventListener('push', e => {
  let veri = {};
  try { veri = e.data ? e.data.json() : {}; } catch { veri = { title: 'Atölye', body: e.data && e.data.text() }; }
  const baslik = veri.title || 'Atölye';
  e.waitUntil(self.registration.showNotification(baslik, {
    body: veri.body || 'Yeni mesaj',
    icon: 'icons/icon-192.png',
    badge: 'icons/icon-192.png',
    tag: veri.proje_id || 'atolye',
    renotify: true,
    data: { proje: veri.proje_id || null },
  }));
});

// Bildirime dokununca: uygulama açıksa öne getir ve o projeyi aç, kapalıysa aç.
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const proje = e.notification.data && e.notification.data.proje;
  const hedef = new URL(proje ? './?proje=' + proje : './', self.registration.scope).href;
  e.waitUntil((async () => {
    const pencereler = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const p of pencereler) {
      if (p.url.startsWith(self.registration.scope)) {
        await p.focus();
        if (proje) p.postMessage({ tip: 'ac', proje });
        return;
      }
    }
    await self.clients.openWindow(hedef);
  })());
});
