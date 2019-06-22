const { generateSW } = require('workbox-build');

generateSW({
    swDest: 'app/sw.js',
    globDirectory: 'app',
    globPatterns: [
        '**/*.{html,css}',
        'main.js',
        'Classes/*.js'
    ],
    skipWaiting: true,
    clientsClaim: true,
    runtimeCaching: [{
            urlPattern: /\.(css|js)/,
            handler: 'CacheFirst'
        },
        {
            urlPattern: /^https:\/\/kit-free.fontawesome.com\/*/,
            handler: 'StaleWhileRevalidate',
            options: {
                cacheName: 'fontawsome'
            }
        },
        {
            urlPattern: /\.(ico|jpeg|jpg|png)/,
            handler: 'CacheFirst',
            options: {
                cacheName: 'icons'
            }
        }
    ]
}).then((count, size) => {
    console.log(`Generated New Service Worker With ${count} precached files, totaling ${size} bytes.`);
}).catch(console.err);