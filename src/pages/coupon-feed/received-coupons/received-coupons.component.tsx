import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/user-context";
import { Coupon } from "../../../components/coupon/coupon.component";
import { ICouponData, useCoupons } from "../../../context/coupon-context";

export const ReceivedCoupons = () => {
  const { userData } = useUser();
  const { receivedCoupons } = useCoupons();
  const navigate = useNavigate();

  return receivedCoupons.length > 0 ? (
    <div>
      {receivedCoupons.map((coupon) => (
        <div
          key={coupon.id}
          onClick={() =>
            navigate("/coupon", { state: { couponId: coupon.id, couponData: coupon.data } })
          }
        >
          <Coupon id={coupon.id} item={coupon.data as ICouponData} />
        </div>
      ))}
    </div>
  ) : (
    <div>
      <img
        src='https://firebasestorage.googleapis.com/v0/b/couponet-c8c94.appspot.com/o/cat-stickers%2Fpurr-costume-party.webp?alt=media&token=46be27c0-a61d-4d9e-b86d-c20e50bad4d2'
        alt='Cat with wizard hat'
      />
      <h2 className='font-displayRegular text-xl text-center mt-4'>
        You have no coupons from {userData?.linkedUserName} yet!
      </h2>
    </div>
  );
};
