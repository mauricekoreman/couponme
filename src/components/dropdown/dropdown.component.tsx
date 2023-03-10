import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { DocumentData } from "firebase/firestore";
import { Coupon } from "../coupon/coupon.component";

interface IDropDown<T> {
  text: string;
  data: T;
  name: string;
  defaultOpen?: boolean;
}

export const DropDown = <T extends DocumentData[]>({
  text,
  data,
  name,
  defaultOpen = false,
}: IDropDown<T>) => {
  const [open, setOpen] = useState<boolean>(
    JSON.parse(sessionStorage.getItem(name) || "{}") || defaultOpen
  );
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem(name, JSON.stringify(open));
  }, [open]);

  return (
    <div>
      <div
        onClick={() => setOpen((prevState) => !prevState)}
        className='flex gap-2 items-center mb-3 cursor-pointer active:opacity-70'
      >
        <FiChevronRight size={"1.3rem"} className={`${open && "rotate-90"}`} />
        <p className='text-lg font-regularMedium'>{text}</p>
      </div>
      {open && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5'>
          {data?.map((item) => (
            <Coupon
              onClick={() =>
                navigate("/coupon", { state: { couponId: item.id, couponData: item.data } })
              }
              item={item.data}
              id={item.id}
              key={item.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};
















