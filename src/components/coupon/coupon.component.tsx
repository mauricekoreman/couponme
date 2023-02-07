import { useEffect } from "react";
import { localDateString } from "../../utils/formatDate";
import { ICouponData, useCoupons } from "../../context/coupon-context";
import { couponStatusEnum } from "../../pages/coupon-screen/coupon-screen.component";

interface ICoupon {
  id: string;
  item: ICouponData;
  withDesc?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const Coupon = ({ id, item, withDesc, onClick }: ICoupon) => {
  const { title, quantity, color, expirationDate, description, used, status } = item;
  const { isCouponExpired } = useCoupons();
  const expired = status === couponStatusEnum.FINISHED || status === couponStatusEnum.EXPIRED;

  useEffect(() => {
    // check if coupon is expired
    if (status === couponStatusEnum.EXPIRED || status === couponStatusEnum.FINISHED) return;
    isCouponExpired({ couponId: id, date: new Date(expirationDate) });
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-between w-full min-w-[280px] px-10 py-3 border-2 rounded-lg drop-shadow-brutal2 ${
        withDesc ? "min-h-fit h-52" : "h-44"
      } ${expired && "opacity-50"} ${
        !!onClick &&
        "cursor-pointer transition duration-75 active:opacity-90 active:drop-shadow-removeBrutal active:translate-y-[2px] active:translate-x-[2px]"
      }`}
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      <p className='font-regularRegular text-sm'>Expires: {localDateString(expirationDate)}</p>
      <h2 className='font-displayBold text-center text-3xl'>{title}</h2>
      {withDesc && <p className='text-sm font-regularMedium text-center py-2'>{description}</p>}
      <div>
        <p className='font-displayRegular text-sm text-center'>Quantity:</p>
        <div className='flex flex-row flex-wrap justify-center'>
          {[...Array(quantity)].map((_, i) => (
            <div
              key={i}
              className={`h-4 w-7 m-1 border-2 bg-off drop-shadow-brutal ${
                i + 1 <= used ? "bg-[#b5b4b4]" : "bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

























