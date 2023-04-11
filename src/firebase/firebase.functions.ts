import { db, messaging } from "./firebase.config";
import { deleteDoc, doc, getDocs } from "firebase/firestore";
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
      alert(currentToken);
    } else {
      console.log("No registration token available. Request permission to generate one");
    }
  } catch (error) {
    console.error("An error occured while retrieving token... ", error);
  }
};

