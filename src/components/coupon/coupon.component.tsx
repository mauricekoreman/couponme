// import { formatDate } from "../../utils/formatDate";

import { useNavigate } from "react-router-dom";
import { couponStatusEnum } from "../../pages/coupon-screen/coupon-screen.component";

export interface ICouponData {
  title: string;
  description: string;
  quantity: number;
  used: number;
  status: couponStatusEnum;
  color: string;
  expirationDate: string; // TODO: formDate toDate
}

interface ICoupon {
  id: string;
  item: ICouponData;
  withDesc?: boolean;
}

export const Coupon = ({ id, item, withDesc }: ICoupon) => {
  const { title, quantity, color, expirationDate, description } = item;

  return (
    <div
      className='flex flex-col items-center justify-around w-full h-44 px-10 py-3 border-2 rounded-lg drop-shadow-brutal2 mb-3'
      style={{ backgroundColor: color }}
    >
      <p className='font-regularRegular text-sm'>Expires: {expirationDate}</p>
      <h2 className='font-displayBold text-center text-3xl'>{title}</h2>
      {withDesc && <p className='text-sm font-regularMedium text-center'>{description}</p>}
      <div>
        <p className='font-displayRegular text-sm text-center'>Quantity</p>
        <div className='flex flex-row flex-wrap justify-center'>
          {[...Array(quantity)].map((_, i) => (
            <div key={i} className='h-4 w-7 m-1 border-2 bg-off bg-white drop-shadow-brutal' />
          ))}
        </div>
      </div>
    </div>
  );
};
