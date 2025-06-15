self.addEventListener("install", (event) => {
  console.log("Service Worker installiert");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker aktiviert");
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).then((res) => {
          return caches.open("dynamic").then((cache) => {
            cache.put(event.request.url, res.clone());
            return res;
          });
        })
      );
    })
  );
});
