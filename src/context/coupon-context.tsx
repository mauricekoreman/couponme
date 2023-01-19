import { useAuth } from "./auth-context";
import { DocumentData, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getCouponsReceivedQuery,
  getCouponsGivenQuery,
  getCouponRef,
} from "../firebase/firebase.queries";
import { toast } from "react-toastify";
import { couponStatusEnum } from "../pages/coupon-screen/coupon-screen.component";

export interface ICouponData {
  color: string;
  createdAt: string;
  description: string | null;
  expirationDate: string;
  from: string;
  quantity: number;
  status: couponStatusEnum;
  sticker: null | string;
  title: string;
  to: string;
  used: number;
}

export interface ICoupon {
  id: string;
  data: ICouponData;
}

interface ICouponContext {
  receivedCoupons: ICoupon[];
  givenCoupons: ICoupon[];
  pendingCoupons: ICoupon[];
  deleteCoupon: ({ couponId }: { couponId: string }) => Promise<void>;
  updateCoupon: ({ couponId }: { couponId: string; updatedData: {} }) => Promise<void>;
  handleConfirmUsed: ({
    couponId,
    used,
    quantity,
  }: {
    couponId: string;
    used: number;
    quantity: number;
  }) => Promise<void>;
  modifiedCoupon: ICoupon;
}

const CouponContext = createContext({} as ICouponContext);

export const CouponProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  const [receivedCoupons, setReceivedCoupons] = useState<ICoupon[]>([]);
  const [givenCoupons, setGivenCoupons] = useState<ICoupon[]>([]);
  const [pendingCoupons, setPendingCoupons] = useState<ICoupon[]>([]);

  const [modifiedCoupon, setModifiedCoupon] = useState<ICoupon>({} as ICoupon);

  // getting the received coupons
  useEffect(() => {
    const unsubscribe = onSnapshot(
      getCouponsReceivedQuery(user!.uid),
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "modified") {
            setModifiedCoupon({ id: change.doc.id, data: change.doc.data() as ICouponData });
          }
        });
        setReceivedCoupons(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() as ICouponData }))
        );
      },
      (error) => {
        console.error(error);
        toast.error("Failed to load received coupons...");
      }
    );

    return unsubscribe;
  }, []);

  // Getting the given coupons
  useEffect(() => {
    const unsubscribe = onSnapshot(
      getCouponsGivenQuery(user!.uid),
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "modified") {
            setModifiedCoupon({ id: change.doc.id, data: change.doc.data() as ICouponData });
          }
        });
        setGivenCoupons(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() as ICouponData }))
        );
      },
      (error) => {
        console.error(error);
        toast.error("Failed to load given coupons...");
      }
    );

    return unsubscribe;
  }, []);

  // Copying the given coupons with status "pending" into pendingCoupons state.
  useEffect(() => {
    setPendingCoupons(givenCoupons.filter((coupon) => coupon.data.status === "pending"));
  }, [givenCoupons]);

  async function deleteCoupon({ couponId }: { couponId: string }) {
    try {
      const couponRef = await getCouponRef(couponId);
      const deleted = await deleteDoc(couponRef);

      return deleted;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  }

  async function updateCoupon({ couponId, updatedData }: { couponId: string; updatedData: {} }) {
    try {
      const couponRef = await getCouponRef(couponId);
      const updated = await updateDoc(couponRef, updatedData);

      return updated;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  }

  async function handleConfirmUsed({
    couponId,
    used,
    quantity,
  }: {
    couponId: string;
    used: number;
    quantity: number;
  }) {
    try {
      const newUsedAmount = used + 1;
      let status = couponStatusEnum.IDLE;

      if (newUsedAmount === quantity) status = couponStatusEnum.FINISHED;

      const updated = updateCoupon({
        couponId: couponId,
        updatedData: { status: status, used: newUsedAmount },
      });

      return updated;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  }

  const value = {
    receivedCoupons,
    givenCoupons,
    pendingCoupons,
    deleteCoupon,
    updateCoupon,
    handleConfirmUsed,
    modifiedCoupon,
  };

  return <CouponContext.Provider value={value}>{!!user && children}</CouponContext.Provider>;
};

export const useCoupons = () => {
  return useContext(CouponContext);
};



