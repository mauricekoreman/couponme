importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

// Fetch handler is needed for PWA recognition. 
self.addEventListener("fetch", (e) => {
  // console.log(`[Service worker]: Fetched resource ${e.request.url}`);
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

// FCM
firebase.initializeApp({
  apiKey: "AIzaSyD34XbCLpJEV5N-15v3ZbLco6wUo7awPV0",
  authDomain: "coupon-dev-d8e92.firebaseapp.com",
  projectId: "coupon-dev-d8e92",
  storageBucket: "coupon-dev-d8e92.appspot.com",
  messagingSenderId: "94418588262",
  appId: "1:94418588262:web:e014a964b19c80e8c793a7",
  measurementId: "G-C3217K58FK",
});

const messaging = firebase.messaging();
messaging.onBackgroundMessage();

// * Below is for cusomizing the message.
// messaging.onBackgroundMessage((payload) => {
//   console.log("[Service worker]: received background message: ", payload);

//   const notificationTitle = "Background message title";
//   const notificationOptions = {
//     body: "background message body",
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);

// });

