import { useAuth } from "../../../context/auth-context";
import { GivenCoupons } from "../given-coupons/given-coupons.component";
import { ReceivedCoupons } from "../received-coupons/received-coupons.component";

export const CouponFeedLayout = () => {
  const { signOut } = useAuth();

  return (
    <main>
      <ReceivedCoupons />
      <GivenCoupons />

      <button onClick={signOut}>sign out</button>
    </main>
  );
};
