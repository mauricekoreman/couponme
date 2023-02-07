import { useLocation, useNavigate } from "react-router-dom";
import { Coupon } from "../../components/coupon/coupon.component";
import { Navbar } from "../../components/navbars/navbar.component";
import { PrimaryButton } from "../../components/buttons/primary-button/primary-button.component";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth-context";
import { useUser } from "../../context/user-context";
import { Sticker } from "../../components/sticker/sticker.component";
import { ICouponData, useCoupons } from "../../context/coupon-context";

export const enum couponStatusEnum {
  IDLE = "idle",
  FINISHED = "finished",
  EXPIRED = "expired",
  PENDING = "pending",
}

export const CouponScreen = () => {
  const { user } = useAuth();
  const { deleteCoupon, handleConfirmUsed, updateCoupon, modifiedCoupon } = useCoupons();
  const { userData } = useUser();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [couponData, setCouponData] = useState<ICouponData>(state.couponData);
  const { from, quantity, status, sticker, used } = couponData;

  useEffect(() => {
    if (modifiedCoupon.id === state.couponId) {
      setCouponData(modifiedCoupon.data);
    }
  }, [modifiedCoupon]);

  function checkIfButtonDisabled() {
    if (
      (status === couponStatusEnum.PENDING && from !== user?.uid) ||
      (status === couponStatusEnum.IDLE && from === user?.uid) ||
      status === couponStatusEnum.EXPIRED ||
      status === couponStatusEnum.FINISHED
    ) {
      return true;
    } else {
      return false;
    }
  }

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

  function showDeleteCoupon(status: string) {
    if (status === couponStatusEnum.FINISHED || status === couponStatusEnum.EXPIRED) {
      return (
        <button
          onClick={() => deleteCoupon({ couponId: state.couponId }).then(() => navigate(-1))}
          className='text-red font-regularMedium text-base text-center block mx-auto'
        >
          Delete coupon
        </button>
      );
    }
  }

  return (
    <div className='min-h-screen relative max-w-screen-lg mx-auto'>
      <Navbar withTitle={false} withBackButton marginBottom={0} />
      <div className='px-4 flex flex-col items-center pb-32'>
        <div className='w-full max-w-3xl'>
          <Coupon withDesc item={couponData} id={state.couponId} />
          <p className='text-base font-regularMedium text-center mt-7'>{statusText(status)}</p>
          {showDeleteCoupon(status)}
        </div>

        <Sticker stickerURI={sticker} className={"mt-12"} />
      </div>
      <PrimaryButton
        disabled={checkIfButtonDisabled()}
        title={from === user?.uid ? "Confirm used" : "Use coupon"}
        onClick={() =>
          from === user?.uid
            ? handleConfirmUsed({ couponId: state.couponId, quantity, used })
            : updateCoupon({
                couponId: state.couponId,
                updatedData: { status: couponStatusEnum.PENDING },
              })
        }
        className='w-[calc(100%_-_2rem)] fixed bottom-4 left-0 right-0 mx-auto'
      />
    </div>
  );
};




























































