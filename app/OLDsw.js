importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');

workbox.skipWaiting();
workbox.clientsClaim();

workbox.routing.registerRoute(/\.js$/, new workbox.strategies.NetworkwFirst());