importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js");

// NOTE: reference the various workbox.* namespaces outside of any event handlers or asynchronous functions.
if (process.env.NODE_ENV === "production") {
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
}

// install event
self.addEventListener("install", (e) => {
  console.log("Service worker: Installed");
});

// activate event
self.addEventListener("activate", (e) => {
  console.log("Service worker: Activated");
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});