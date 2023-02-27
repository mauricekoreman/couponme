import {
  DocumentData,
  addDoc,
  collection,
  doc,
  getDoc,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase.config";
import { toast } from "react-toastify";

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

export async function updateCoupon(couponData: DocumentData, couponId: string) {
  const couponRef = doc(db, "coupons", couponId);
  return new Promise<boolean>(
    async (resolve, reject) =>
      await updateDoc(couponRef, couponData)
        .then(() => {
          toast.success("Updated coupon!");
          resolve(true);
        })
        .catch(() => {
          toast.error("Couldn't update coupon...");
          reject(false);
        })
  );
}

