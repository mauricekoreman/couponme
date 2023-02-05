import { deleteDoc, doc, getDocs } from "firebase/firestore";
import { getCouponsGivenQuery, getCouponsReceivedQuery } from "./firebase.queries";
import { db } from "./firebase.config";

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
