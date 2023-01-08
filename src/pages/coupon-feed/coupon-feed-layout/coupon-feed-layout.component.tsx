import { GivenCoupons } from "../given-coupons/given-coupons.component";
import { ReceivedCoupons } from "../received-coupons/received-coupons.component";

export const CouponFeedLayout = () => (
  <main>
    <ReceivedCoupons />
    <GivenCoupons />
  </main>
);
