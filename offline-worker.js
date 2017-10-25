/* Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/publicdomain/zero/1.0/ */


(function (self) {
  'use strict';

  // On install, cache resources and skip waiting so the worker won't
  // wait for clients to be closed before becoming active.
  self.addEventListener('install', event =>
    event.waitUntil(
      oghliner.cacheResources()
      .then(() => self.skipWaiting())
    )
  );

  // On activation, delete old caches and start controlling the clients
  // without waiting for them to reload.
  self.addEventListener('activate', event =>
    event.waitUntil(
      oghliner.clearOtherCaches()
      .then(() => self.clients.claim())
    )
  );

  // Retrieves the request following oghliner strategy.
  self.addEventListener('fetch', event => {
    if (event.request.method === 'GET') {
      event.respondWith(oghliner.get(event.request));
    } else {
      event.respondWith(self.fetch(event.request));
    }
  });

  var oghliner = self.oghliner = {

    // This is the unique prefix for all the caches controlled by this worker.
    CACHE_PREFIX: 'offline-cache:laszl0/localize:' + (self.registration ? self.registration.scope : '') + ':',

    // This is the unique name for the cache controlled by this version of the worker.
    get CACHE_NAME() {
      return this.CACHE_PREFIX + '8827c3bdd95df595ac78a316b8553f3c834eec7c';
    },

    // This is a list of resources that will be cached.
    RESOURCES: [
      './images/icon-144x144.png', // c5a19e45813f786bb9b036ab94c5cfd2d716f8fe
      './images/icon-192x192.png', // 7bd0826642db65614225553fe22e1018639d0faa
      './images/icon-48x48.png', // 48432af0ed7ace0d3e87f15e6731846e80ac9de0
      './images/icon-512x512.png', // 4296c461af9538d0ca6309c629bd32b038db5db7
      './images/icon-72x72.png', // b21ceba81e723de749057644daa9bf965f7a5151
      './images/icon-96x96.png', // 0426de5fe7815d94094fed99928c66e2a846abac
      './index.html', // df0fe41f4c54cc5522a3bb18872ba002c5c1a5b7
      './scripts/add.js', // 9d08028d8834ab20ea82e2691db300e6997a60b2
      './scripts/index.js', // f279ff5bd1250c188802fd333b2d8119ece947f0
      './scripts/material.min.js', // 1ab50540032210391656928cd1564530353096cd
      './scripts/offline-manager.js', // e2e09e000c5b64035940ae44e9c0936eb25ecd51
      './scripts/shared.js', // cc828bccc78661b8f509ab705e8b6ffd485a32bf
      './styles/material-icons.css', // 6ca40c49309d3a7e62da2501c26e49e6d9224d6b
      './styles/material.min.css', // 62364e7cb9cfd9889c1bf3223ac1640509237b9a
      './styles/stylesheet.css', // 74709dd490d6ee1679c84f698370551178318d4e

    ],

    // Adds the resources to the cache controlled by this worker.
    cacheResources: function () {
      var now = Date.now();
      var baseUrl = self.location;
      return this.prepareCache()
      .then(cache => Promise.all(this.RESOURCES.map(resource => {
        // Bust the request to get a fresh response
        var url = new URL(resource, baseUrl);
        var bustParameter = (url.search ? '&' : '') + '__bust=' + now;
        var bustedUrl = new URL(url.toString());
        bustedUrl.search += bustParameter;

        // But cache the response for the original request
        var requestConfig = { credentials: 'same-origin' };
        var originalRequest = new Request(url.toString(), requestConfig);
        var bustedRequest = new Request(bustedUrl.toString(), requestConfig);
        return fetch(bustedRequest)
        .then(response => {
          if (response.ok) {
            return cache.put(originalRequest, response);
          }
          console.error('Error fetching ' + url + ', status was ' + response.status);
        });
      })));
    },

    // Remove the offline caches not controlled by this worker.
    clearOtherCaches: function () {
      var outOfDate = cacheName => cacheName.startsWith(this.CACHE_PREFIX) && cacheName !== this.CACHE_NAME;

      return self.caches.keys()
      .then(cacheNames => Promise.all(
        cacheNames
        .filter(outOfDate)
        .map(cacheName => self.caches.delete(cacheName))
      ));
    },

    // Get a response from the current offline cache or from the network.
    get: function (request) {
      return this.openCache()
      .then(cache => cache.match(() => this.extendToIndex(request)))
      .then(response => {
        if (response) {
          return response;
        }
        return self.fetch(request);
      });
    },

    // Make requests to directories become requests to index.html
    extendToIndex: function (request) {
      var url = new URL(request.url, self.location);
      var path = url.pathname;
      if (path[path.length - 1] !== '/') {
        return request;
      }
      url.pathname += 'index.html';
      return new Request(url.toString(), request);
    },

    // Prepare the cache for installation, deleting it before if it already exists.
    prepareCache: function () {
      return self.caches.delete(this.CACHE_NAME)
      .then(() => this.openCache());
    },

    // Open and cache the offline cache promise to improve the performance when
    // serving from the offline-cache.
    openCache: function () {
      if (!this._cache) {
        this._cache = self.caches.open(this.CACHE_NAME);
      }
      return this._cache;
    }

  };
}(self));
