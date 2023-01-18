import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { DocumentData } from "firebase/firestore";
import { Coupon } from "../coupon/coupon.component";

interface IDropDown<T> {
  text: string;
  data: T;
  defaultOpen?: boolean;
}

export const DropDown = <T extends DocumentData[]>({
  text,
  data,
  defaultOpen = false,
}: IDropDown<T>) => {
  const [open, setOpen] = useState(defaultOpen);
  const navigate = useNavigate();

  return (
    <div>
      <div
        onClick={() => setOpen((prevState) => !prevState)}
        className='flex gap-2 items-center mb-3'
      >
        <FiChevronRight size={"1.3rem"} className={`${open && "rotate-90"}`} />
        <p className='text-lg font-regularMedium'>{text}</p>
      </div>
      <div className='flex flex-col'>
        {open &&
          data.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                navigate("/coupon", { state: { couponId: item.id, couponData: item.data } })
              }
            >
              <Coupon item={item.data} id={item.id} key={item.id} />
            </div>
          ))}
      </div>
    </div>
  );
};
