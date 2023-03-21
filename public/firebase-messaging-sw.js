importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js");

// NOTE: reference the various workbox.* namespaces outside of any event handlers or asynchronous functions.

const { registerRoute } = workbox.routing;
const { StaleWhileRevalidate } = workbox.strategies;

// install event
self.addEventListener("install", (e) => {
  console.log("Service worker: Installed");
});

// activate event
self.addEventListener("activate", (e) => {
  console.log("Service worker: Activated");
});
