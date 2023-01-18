import { useLocation } from "react-router-dom";
import { Coupon } from "../../components/coupon/coupon.component";
import { Navbar } from "../../components/navbars/navbar.component";
import { PrimaryButton } from "../../components/buttons/primary-button/primary-button.component";
import { useAuth } from "../../context/auth-context";
import { useUser } from "../../context/user-context";
import { Sticker } from "../../components/sticker/sticker.component";

export const enum couponStatusEnum {
  IDLE = "idle",
  FINISHED = "finished",
  EXPIRED = "expired",
  PENDING = "pending",
}

export const CouponScreen = () => {
  const { user } = useAuth();
  const { userData } = useUser();
  const { state } = useLocation();
  const {
    color,
    createdAt,
    description,
    expirationDate,
    from,
    quantity,
    status,
    sticker,
    title,
    to,
    used,
  } = state.couponData;

  function statusText(status: string) {
    switch (status) {
      case couponStatusEnum.PENDING:
        return from === user!.uid
          ? `${userData?.linkedUserName} has used this coupon and is waiting for you to confirm that it has been fulfilled!`
          : `Status: waiting for ${userData?.linkedUserName} to confirm completion`;
      case couponStatusEnum.EXPIRED:
        return "Coupon has expired and cannot be used anymore :'(";
      default:
        break;
    }
  }

  function deleteCoupon(status: string) {
    if (status === couponStatusEnum.FINISHED || status === couponStatusEnum.EXPIRED) {
      return (
        <button
          onClick={() => console.log("Delete coupon")}
          className='text-red font-regularMedium text-base text-center block mx-auto'
        >
          Delete coupon
        </button>
      );
    }
  }

  return (
    <div className='px-4 min-h-screen relative'>
      <Navbar withTitle={false} withBackButton />
      <Coupon withDesc item={state.couponData} id={state.couponId} />
      <p className='text-base font-regularMedium text-center'>{statusText(status)}</p>
      {deleteCoupon(status)}

      <Sticker stickerURI={sticker} className={"mt-32"} />

      <PrimaryButton
        disabled={status === couponStatusEnum.EXPIRED || status === couponStatusEnum.FINISHED}
        title='Use coupon'
        className='absolute bottom-4 w-[calc(100%_-_2rem)]'
      />
    </div>
  );
};
