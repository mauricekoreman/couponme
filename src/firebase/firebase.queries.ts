import { addDoc, collection, doc, getDoc, orderBy, query, where } from "firebase/firestore";
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

export async function getStickers() {
  const catStickerRef = doc(collection(db, "stickers"), "cat-stickers");
  const catStickersSnap = await getDoc(catStickerRef);

  return catStickersSnap;
}

export async function getCouponRef(couponId: string) {
  const couponRef = doc(collection(db, "coupons"), couponId);

  return couponRef;
}

interface ICreateCouponFn {
  title: string;
  description: string | undefined;
  quantity: number;
  color: string;
  sticker: string | null;
  used: number;
  expirationDate: string;
  status: string;
  to: string;
  from: string;
  createdAt: string;
}

export async function createCoupon(couponData: ICreateCouponFn) {
  const couponRef = await addDoc(collection(db, "coupons"), couponData);

  return couponRef;
}

