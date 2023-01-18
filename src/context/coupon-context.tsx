import { DocumentData, onSnapshot } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getCouponsReceivedQuery, getCouponsGivenQuery } from "../firebase/firebase.queries";
import { useAuth } from "./auth-context";
import { useUser } from "./user-context";

export interface ICoupon {
  id: string;
  data: DocumentData;
}

interface ICouponContext {
  receivedCoupons: ICoupon[];
  givenCoupons: ICoupon[];
  pendingCoupons: ICoupon[];
}

const CouponContext = createContext({} as ICouponContext);

export const CouponProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  const [receivedCoupons, setReceivedCoupons] = useState<ICoupon[]>([]);
  const [givenCoupons, setGivenCoupons] = useState<ICoupon[]>([]);
  const [pendingCoupons, setPendingCoupons] = useState<ICoupon[]>([]);

  // getting the received coupons
  useEffect(() => {
    const unsubscribe = onSnapshot(getCouponsReceivedQuery(user!.uid), (snapshot) => {
      setReceivedCoupons(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });

    return unsubscribe;
  }, []);

  // Getting the given coupons
  useEffect(() => {
    const unsubscribe = onSnapshot(getCouponsGivenQuery(user!.uid), (snapshot) => {
      setGivenCoupons(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });

    return unsubscribe;
  }, []);

  // Copying the given coupons with status "pending" into pendingCoupons state.
  useEffect(() => {
    setPendingCoupons(givenCoupons.filter((coupon) => coupon.data.status === "pending"));
  }, [givenCoupons]);

  const value = {
    receivedCoupons,
    givenCoupons,
    pendingCoupons,
  };

  return <CouponContext.Provider value={value}>{!!user && children}</CouponContext.Provider>;
};

export const useCoupons = () => {
  return useContext(CouponContext);
};
