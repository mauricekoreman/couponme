import { ICouponData } from "../../context/coupon-context";

interface ICoupon {
  id: string;
  item: ICouponData;
  withDesc?: boolean;
}

export const Coupon = ({ id, item, withDesc }: ICoupon) => {
  const { title, quantity, color, expirationDate, description, used } = item;

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
