import { DocumentData, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getCouponsReceivedQuery } from "../../../firebase/firebase.queries";
import { useAuth } from "../../../context/auth-context";
import { Coupon, ICouponData } from "../../../components/coupon/coupon.component";

interface IReceivedCoupons {
  id: string;
  data: DocumentData;
}

export const ReceivedCoupons = () => {
  const { user } = useAuth();
  const [receivedCoupons, setReceivedCoupons] = useState<IReceivedCoupons[]>([
    {
      id: "123141",
      data: {
        title: "Title",
        quantity: 3,
        used: 2,
        status: "idle",
        to: "123231",
        from: user!.uid,
        expirationDate: new Date(),
        createdAt: new Date(),
        color: "#A3E8FF",
      },
    },
  ]);

  // Subscribes to user received coupons
  // useEffect(() => {
  //   const unsubscribe = onSnapshot(getCouponsReceivedQuery(user!.uid), (snapshot) => {
  //     setReceivedCoupons(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
  //   });

  //   return unsubscribe;
  // }, []);

  return receivedCoupons.length > 0 ? (
    <Coupon id={receivedCoupons[0].id} item={receivedCoupons[0].data as ICouponData} />
  ) : (
    <div>
      <img src='https://firebasestorage.googleapis.com/v0/b/couponet-c8c94.appspot.com/o/cat-stickers%2Fpurr-costume-party.webp?alt=media&token=46be27c0-a61d-4d9e-b86d-c20e50bad4d2' />
    </div>
  );
};
