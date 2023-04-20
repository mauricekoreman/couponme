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

    // TODO: sage token to database with timestamp and update whenever the token changes, such as when:
    /* *
     * 1. the app is restored on a new device
     * 2. the user installs/reinstalls app
     * 3. the user clears app data.
     *
     * todo: check if the generated token is the same as currently in the database. If not, change, else, do nothing.
     */

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





