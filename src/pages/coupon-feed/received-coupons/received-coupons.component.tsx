import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/user-context";
import { Coupon } from "../../../components/coupon/coupon.component";
import { ICouponData, useCoupons } from "../../../context/coupon-context";

export const ReceivedCoupons = () => {
  const { userData } = useUser();
  const { receivedCoupons } = useCoupons();
  const navigate = useNavigate();

  return receivedCoupons?.length > 0 ? (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-screen-xl'>
      {receivedCoupons.map((coupon) => (
        <Coupon
          onClick={() =>
            navigate("/coupon", { state: { couponId: coupon.id, couponData: coupon.data } })
          }
          id={coupon.id}
          item={coupon.data as ICouponData}
          key={coupon.id}
        />
      ))}
    </div>
  ) : (
    <div className={"flex flex-col gap-4 justify-center items-center mt-10"}>
      <img
        src='https://firebasestorage.googleapis.com/v0/b/couponet-c8c94.appspot.com/o/cat-stickers%2Fpurr-costume-party.webp?alt=media&token=46be27c0-a61d-4d9e-b86d-c20e50bad4d2'
        alt='Cat with wizard hat'
      />
      <h2 className='font-displayRegular text-xl text-center'>
        You have no coupons from {userData?.linkedUserName} yet!
      </h2>
    </div>
  );
};
















