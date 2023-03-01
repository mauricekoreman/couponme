import {
  DocumentData,
  addDoc,
  collection,
  doc,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase.config";
import { toast } from "react-toastify";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase.config";

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
  const listRes = await listAll(ref(storage, "/cat-stickers"));
  const stickersRef = listRes.items.map((itemRef) => itemRef);
  let stickerURLs: string[] = [];

  for (const sticker of stickersRef) {
    stickerURLs.push(await getDownloadURL(sticker));
  }

  return stickerURLs;
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














