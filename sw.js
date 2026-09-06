const CACHE='wufc-u13-v1';
const ASSETS=['./','./index.html','./styles.css','./data.js','./app.js','./manifest.json','./assets/club-badge.png','./assets/westerhope-header.png','./assets/u13-silvers-header.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
