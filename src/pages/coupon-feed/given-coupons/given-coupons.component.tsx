import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/user-context";
import { useCoupons } from "../../../context/coupon-context";
import { DropDown } from "../../../components/dropdown/dropdown.component";
import { PrimaryButton } from "../../../components/buttons/primary-button/primary-button.component";

export const GivenCoupons = () => {
  const { userData } = useUser();
  const navigate = useNavigate();
  const { givenCoupons, pendingCoupons } = useCoupons();

  return (
    <div className='pb-20'>
      <DropDown
        data={pendingCoupons}
        defaultOpen={pendingCoupons.length > 0}
        text={`Coupons used by ${userData?.linkedUserName} (${pendingCoupons.length})`}
      />
      <DropDown data={givenCoupons} text={"All coupons given"} />
      <PrimaryButton
        title='Give new coupon'
        onClick={() => navigate("/new")}
        className='fixed bottom-4 w-[calc(100%_-_2rem)]'
      />
    </div>
  );
};





