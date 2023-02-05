import { DocumentData, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
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

// update the data of a the linked user. (e.g. when the current user changes their name, it should also be updated in the linkedUser document)
export async function updateLinkedUserData({
  currentUserData,
  newUserData,
}: {
  currentUserData: DocumentData | undefined;
  newUserData: DocumentData;
}) {
  if (!currentUserData) return;

  const linkedUserDocRef = doc(db, "users", currentUserData.linked);

  // update the document of the linked user
  await updateDoc(linkedUserDocRef, newUserData);
}
