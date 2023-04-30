import { db, messaging } from "./firebase.config";
import { deleteDoc, doc, getDoc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
import { getCouponsGivenQuery, getCouponsReceivedQuery } from "./firebase.queries";
import { getToken } from "firebase/messaging";

// delete all coupons that were given and received by these users
export async function deleteCoupons({ userId }: { userId: string }) {
  const couponsGiven = getDocs(getCouponsGivenQuery(userId));
  const couponsReceived = getDocs(getCouponsReceivedQuery(userId));
  const coupons = await Promise.all([couponsGiven, couponsReceived]);

  // push all ids in arr to get reference
  const couponIds: string[] = [];
  coupons.forEach((docs) => docs.forEach((coupon) => couponIds.push(coupon.id)));

  // delete all user given and received coupons
  for await (const id of couponIds) {
    deleteDoc(doc(db, "coupons", id));
  }
}

export const getFirebaseToken = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });

    if (currentToken) {
      console.log("current token: ", currentToken);
      localStorage.setItem("GCM-token", currentToken);
    } else {
      console.log("No registration token available. Request permission to generate one");
    }
  } catch (error) {
    console.error("An error occured while retrieving token... ", error);
  }
};

export const getSavedFirebaseToken = async (userId: string) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const docSnap = await getDoc(userDocRef);

    if (!docSnap.exists()) {
      return null;
    }

    return docSnap.data().cloudMessaging;
  } catch (error) {
    console.error("An error occured while retrieving the GCM token from the DB...", error);
  }
};

export const saveMessagingTokenToDB = async (userId: string) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const token = localStorage.getItem("GCM-token");
    const savedToken = await getSavedFirebaseToken(userId);

    // token exists and doesn't need to get updated.
    if (token === savedToken?.token) {
      return;
    }

    if (token) {
      return await updateDoc(userDocRef, {
        cloudMessaging: { token: token, timestamp: new Date() },
      });
    }
  } catch (error) {
    console.error("An error occured saving messaging token to the DB...", error);
  }
};



