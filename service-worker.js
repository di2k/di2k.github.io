importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

if (workbox) {
    console.log(`Workbox berhasil dimuat.`);

    workbox.core.skipWaiting();
    workbox.core.clientsClaim();

    workbox.precaching.precacheAndRoute([
        { url: '/', revision: '1' },
        { url: '/manifest.json', revision: '1' },
        { url: '/index.html', revision: '1' },
        { url: '/src/nav.html', revision: '1' },
        { url: '/assets/css/materialize.min.css', revision: '1' },
        { url: '/assets/js/materialize.min.js', revision: '1' },
        { url: '/assets/js/idb.js', revision: '1' },
        { url: '/assets/js/main.js', revision: '1' },
        { url: '/assets/js/modules/api.js', revision: '1' },
        { url: '/assets/js/modules/database.js', revision: '1' },
        { url: '/assets/js/modules/listener.js', revision: '1' },
        { url: '/assets/js/modules/nav.js', revision: '1' },
        { url: '/assets/js/modules/page.js', revision: '1' },
        { url: '/assets/js/modules/pwa.js', revision: '1' },
        { url: '/src/pages/about.html', revision: '1' },
        { url: '/src/pages/bookmark.html', revision: '1' },
        { url: '/src/pages/home.html', revision: '1' },
        { url: '/src/pages/teams.html', revision: '1' },
        { url: '/assets/img/a01.png', revision: '1' },
        { url: '/assets/img/a02.jpg', revision: '1' },
        { url: '/assets/img/bg01.jpg', revision: '1' },
        { url: '/assets/img/bg02.jpg', revision: '1' },
        { url: '/assets/img/bg03.jpg', revision: '1' },
        { url: '/assets/img/bola_logo1.png', revision: '1' },
        { url: '/assets/img/bola_logo2.png', revision: '1' },
        { url: '/assets/img/favicon-32.png', revision: '1' },
        { url: '/assets/img/favicon-192.png', revision: '1' },
        { url: '/assets/img/favicon-512.png', revision: '1' },
    ]);

    workbox.routing.registerRoute(
        /\.(?:png|jpg|jpx|css|svg)$/,
        workbox.strategies.cacheFirst({
            cacheName: "images",
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200]
                }),
                new workbox.expiration.Plugin({
                    maxEntries: 25,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
            ],
        })
    );

    workbox.routing.registerRoute(
        /^https:\/\/fonts\.googleapis\.com/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'google-fonts-stylesheets',
        })
    );

    workbox.routing.registerRoute(
        /\.(?:woff2)$/,
        workbox.strategies.cacheFirst({
            cacheName: "font-icon",
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 25,
                    maxAgeSeconds: 30 * 24 * 60 * 60, 
                }),
            ],
        })
    );

    workbox.routing.registerRoute(
        /\.(?:js|css)$/,
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'static-resources',
        })
    );

    workbox.routing.registerRoute(
        new RegExp('/src/pages/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'pages'
        })
    );

    workbox.routing.registerRoute(
        /^https:\/\/api\.football\-data\.org\/v2\//,
        workbox.strategies.staleWhileRevalidate({
            cacheName: "football-data-api",
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 120,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
            ],
        })
    );


} else {
    console.log(`Workbox gagal dimuat.`);
}

self.addEventListener('push', event => {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    const options = {
        body: body,
        icon: '/assets/img/favicon-32.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});