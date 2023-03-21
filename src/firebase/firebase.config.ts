import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken } from "firebase/messaging";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const messaging = getMessaging(app);

// Firebase cloud messaging setup
// const getFirebaseToken = async () => {
//   try {
//     const currentToken = await getToken(messaging, {
//       vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
//     });
//     if (currentToken) {
//       console.log("currentToken: ", currentToken);
//       // send token to server
//       // ...
//     } else {
//       // show permission request
//       console.log("No registration token available. Request permission to generate one");
//     }
//   } catch (error) {
//     console.log("An error occured retrieving token. ", error);
//   }
// };

// export const requestForToken = async () => {
//   try {
//     const permission = await Notification.requestPermission();
//     if (permission === "granted") {
//       console.log("getting firebase token");
//       await getFirebaseToken();
//     } else {
//       console.log("notification permission not granted... ");
//     }
//   } catch (error) {
//     console.log("An error occured while getting user permission. ", error);
//   }
// };