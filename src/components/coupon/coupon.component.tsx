import { formatDate } from "../../utils/formatDate";

export interface ICouponData {
  title: string;
  quantity: number;
  used: number;
  status: "idle" | "pending" | "finished" | "expired";
  color: string;
  expirationDate: Date; // TODO: formDate toDate
}

interface ICoupon {
  id: string;
  item: ICouponData;
}

export const Coupon = ({ id, item }: ICoupon) => {
  const { title, quantity, used, status, color, expirationDate } = item;

  return (
    <div className='flex flex-col items-center justify-around w-full h-44 px-10 py-3 border-2 rounded-lg bg-blue drop-shadow-brutal2'>
      <p className='font-regularRegular text-sm'>Expires: {formatDate(expirationDate)}</p>
      <h2 className='font-displayBold text-center text-3xl'>{title}</h2>
      <p className='font-displayRegular text-sm'>Quantity</p>
      <div className='flex flex-row flex-wrap justify-center'>
        {[...Array(quantity)].map((_, i) => (
          <div key={i} className='h-4 w-7 m-1 border-2 bg-off bg-white drop-shadow-brutal' />
        ))}
      </div>
    </div>
  );
};
