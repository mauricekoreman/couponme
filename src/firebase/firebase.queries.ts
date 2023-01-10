import { collection, orderBy, query, where } from "firebase/firestore";
import { db } from "./firebase.config";

export function getCouponsReceivedQuery(userId: string) {
  const couponsReceivedQuery = query(
    collection(db, "coupons"),
    where("to", "==", userId),
    orderBy("createdAt", "desc")
  );

  return couponsReceivedQuery;
}

export function getCouponsGivenQuery(userId: string) {
  const couponsGivenQuery = query(
    collection(db, "coupons"),
    where("from", "==", userId),
    orderBy("createdAt", "desc")
  );

  return couponsGivenQuery;
}
