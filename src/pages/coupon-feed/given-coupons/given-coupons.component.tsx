import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { DocumentData } from "firebase/firestore";
import { useUser } from "../../../context/user-context";
import { useCoupons } from "../../../context/coupon-context";
import { Coupon } from "../../../components/coupon/coupon.component";
import { PrimaryButton } from "../../../components/buttons/primary-button/primary-button.component";

interface IDropDown<T> {
  text: string;
  data: T;
}

const DropDown = <T extends DocumentData[]>({ text, data }: IDropDown<T>) => {
  const [open, setOpen] = useState(false);

  return (
    <div onClick={() => setOpen((prevState) => !prevState)}>
      <div className='flex gap-2 items-center mb-3'>
        <FiChevronRight size={"1.3rem"} className={`${open && "rotate-90"}`} />
        <p className='text-lg font-regularMedium'>{text}</p>
      </div>
      <div className='flex flex-col'>
        {open && data.map((item) => <Coupon item={item.data} id={item.id} key={item.id} />)}
      </div>
    </div>
  );
};

export const GivenCoupons = () => {
  const { userData } = useUser();
  const navigate = useNavigate();
  const { givenCoupons, pendingCoupons } = useCoupons();

  return (
    <div>
      <DropDown
        data={pendingCoupons}
        text={`Coupons used by ${userData?.linkedUserName} (${pendingCoupons.length})`}
      />
      <DropDown data={givenCoupons} text={"All coupons given"} />
      <PrimaryButton
        title='Give new coupon'
        onClick={() => navigate("/new")}
        className='absolute bottom-4 w-[calc(100%_-_2rem)]'
      />
    </div>
  );
};
