importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js");

// import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging";
// import { onBackgroundMessage } from "firebase/messaging/sw";

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

// const firebaseApp = initializeApp({
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// });

// const messaging = getMessaging(firebaseApp);

// onBackgroundMessage(messaging, (payload) => {
//   console.log("Received background message in service worker: ", payload);

//   // self.registration.showNotification()


// });