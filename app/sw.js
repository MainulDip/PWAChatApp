/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "index.html",
    "revision": "ca64098c29a634b6b36f62d13a0b0e35"
  },
  {
    "url": "main.js",
    "revision": "0baf178d37f3da248bd9643ff6dc3c81"
  },
  {
    "url": "Classes/camera.js",
    "revision": "142fef35967a274d0c9bcf69bbe9912e"
  },
  {
    "url": "Classes/messages.js",
    "revision": "b16b5935fcc0da1956efe5a6055ce75c"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(css|js)/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/^https:\/\/kit-free.fontawesome.com\/*/, new workbox.strategies.StaleWhileRevalidate({ "cacheName":"fontawsome", plugins: [] }), 'GET');
workbox.routing.registerRoute(/\.(ico|jpeg|jpg|png)/, new workbox.strategies.CacheFirst({ "cacheName":"icons", plugins: [] }), 'GET');
