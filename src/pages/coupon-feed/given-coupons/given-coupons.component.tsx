import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../../components/buttons/primary-button/primary-button.component";

export const GivenCoupons = () => {
  const navigate = useNavigate();

  return <PrimaryButton title='Give new coupon' onClick={() => navigate("/new")} />;
};
