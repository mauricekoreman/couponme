import { colors } from "./colors";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { DocumentData } from "firebase/firestore";
import { useUser } from "../../context/user-context";
import { useAuth } from "../../context/auth-context";
import { inputDateString, localDateString } from "../../utils/formatDate";
import { FiCalendar, FiMinus, FiPlus } from "react-icons/fi";
import { Modal } from "../../components/modal/modal.component";
import { Input } from "../../components/input/input.component";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Navbar } from "../../components/navbars/navbar.component";
import { Sticker } from "../../components/sticker/sticker.component";
import { Textarea } from "../../components/input/textarea.component";
import { createCoupon, getStickers, updateCoupon } from "../../firebase/firebase.queries";
import { couponStatusEnum } from "../coupon-screen/coupon-screen.component";
import { PrimaryButton } from "../../components/buttons/primary-button/primary-button.component";
import { SecondaryButton } from "../../components/buttons/secondary-button/secondary-button.component";
import { ICouponData, useCoupons } from "../../context/coupon-context";
import { TextButton } from "../../components/buttons/text-button/text-button.component";
import { Popup } from "../../components/popup/popup.component";

export const CreateCoupon = ({ type }: { type: "edit" | "create" }) => {
  const { user } = useAuth();
  const { userData } = useUser();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { deleteCoupon } = useCoupons();
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    if (type === "edit" && !!!state) navigate("/given-coupons");
  }, [state]);

  const { couponData: couponState, couponId }: { couponData: ICouponData; couponId: string } =
    state || {};

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [quantityCount, setQuantityCount] = useState(1);
  const [selectedColor, setSelectedColor] = useState(couponState?.color ?? colors.blue);
  const [sticker, setSticker] = useState<string | null>(couponState?.sticker ?? null);
  const dateRef = useRef<HTMLInputElement>(null);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [stickers, setStickers] = useState<DocumentData | {}>({});

  const standardExpirationDate = new Date();
  standardExpirationDate.setMonth(standardExpirationDate.getMonth() + 4);
  const standardText = "font-regularMedium text-lg";

  function clickButton(action: "add" | "subtract") {
    if (action === "add" && quantityCount < 5) {
      setQuantityCount((prevState) => prevState + 1);
    } else if (action === "subtract" && quantityCount > 1) {
      setQuantityCount((prevState) => prevState - 1);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      if (!!!titleRef.current?.value || !!!dateRef.current?.value) {
        throw new Error("Fill in all required fields");
      }

      const couponData = {
        title: titleRef.current.value,
        description: descriptionRef.current?.value,
        quantity: quantityCount,
        color: selectedColor,
        sticker: sticker,
        used: 0,
        expirationDate: new Date(dateRef.current.value).toISOString(),
        status: couponStatusEnum.IDLE,
        to: userData!.linked,
        from: user!.uid,
        createdAt: new Date().toISOString(),
      };

      if (type === "create") {
        const couponRef = await createCoupon(couponData);
        // If successful
        if (!!couponRef) {
          navigate("/given-coupons");
        }
      } else if (type === "edit") {
        const updated = await updateCoupon(couponData, couponId);

        if (!!updated) {
          navigate(-1);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message as string);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function stickers() {
      if (Object.keys(stickers).length === 0) {
        const stickerSnap = await getStickers();
        const data = stickerSnap.data();
        if (data !== undefined) setStickers(data);
      }
    }

    stickers();
  }, []);

  return (
    <div>
      <Navbar
        navbarTitle={type === "create" ? "New coupon" : "Edit coupon"}
        withBackButton
        marginBottom={0}
      />
      <form className='px-4 py-6' onSubmit={handleSubmit}>
        <Input
          ref={titleRef}
          label='Title*'
          placeholder='Title'
          type={"text"}
          name='title'
          maxLength={26}
          defaultValue={couponState?.title}
        />
        <Textarea
          ref={descriptionRef}
          label='Description'
          placeholder='Description'
          name='description'
          maxLength={120}
          rows={4}
          defaultValue={couponState?.description ?? undefined}
        />

        <div className='mb-12'>
          <label className={standardText}>Quantity</label>
          <div className='flex items-center w-36 justify-between mt-4'>
            <SecondaryButton textOrIcon={<FiMinus />} onClick={() => clickButton("subtract")} />
            <p className={standardText}>{couponState?.quantity ?? quantityCount}</p>
            <SecondaryButton textOrIcon={<FiPlus />} onClick={() => clickButton("add")} />
          </div>
        </div>

        <div className='mb-12'>
          <label htmlFor='date' className={standardText}>
            Expiration date*
          </label>
          <div className='flex items-center gap-2 mt-2'>
            <FiCalendar size={"1.7rem"} />
            <input
              ref={dateRef}
              onFocus={() => dateRef.current?.showPicker()}
              name='date'
              type='date'
              min={inputDateString(new Date())}
              required
              defaultValue={couponState && inputDateString(new Date(couponState?.expirationDate))}
              className={`${standardText} border-0 outline outline-2 rounded-sm bg-offwhite  outline-black p-0 m-0`}
            />
          </div>
        </div>

        <div className='mb-14'>
          <label className={standardText}>Choose a coupon color</label>
          <div className='flex flex-row flex-wrap justify-between'>
            {Object.entries(colors).map((color) => (
              <div
                key={color[0]}
                style={{ backgroundColor: color[1] }}
                className={`w-16 h-12 m-1 grow cursor-pointer ${
                  color[1] === selectedColor && "border-2"
                }`}
                onClick={() => setSelectedColor(color[1])}
              />
            ))}
          </div>
        </div>

        <div className='mb-20 flex flex-col items-center'>
          {sticker ? (
            <Sticker stickerURI={sticker} />
          ) : (
            <label htmlFor='choose sticker' className='font-displayRegular text-2xl'>
              Choose a sticker
            </label>
          )}

          <div className='flex gap-2'>
            <SecondaryButton
              onClick={() => setModalOpen((prev) => !prev)}
              textOrIcon='Choose'
              className='px-8 mt-5'
              name='choose sticker'
            />
            {sticker && (
              <SecondaryButton
                onClick={() => setSticker(null)}
                textOrIcon='Delete'
                className='px-8 mt-5'
                name='delete sticker'
              />
            )}
          </div>
          {modalOpen && (
            <Modal title='Choose sticker' close={() => setModalOpen((prev) => !prev)}>
              <div className='flex flex-wrap justify-between'>
                {Object.entries(stickers).map((el, i) => (
                  <img
                    key={i}
                    src={el[1].url}
                    className='h-32 w-32 object-contain'
                    onClick={() => {
                      setSticker(el[1].url);
                      setModalOpen((prev) => !prev);
                    }}
                  />
                ))}
              </div>
            </Modal>
          )}
        </div>

        <PrimaryButton
          loading={loading}
          title={type === "create" ? "Create coupon" : "Save changes"}
          type='submit'
        />

        {type === "edit" && (
          <button
            type='button'
            onClick={() => setPopupOpen(true)}
            className='text-red font-regularMedium text-base text-center block mx-auto mt-6'
          >
            Delete coupon
          </button>
        )}
      </form>
      {popupOpen ? (
        <Popup
          title={"Are you sure you want to delete this coupon?"}
          onClick={() => deleteCoupon({ couponId: state.couponId }).then(() => navigate(-2))}
          key={"Delete coupon"}
          close={() => setPopupOpen(false)}
        />
      ) : null}
    </div>
  );

};