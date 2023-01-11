import { FiCalendar, FiMinus, FiPlus } from "react-icons/fi";
import { Input } from "../../components/input/input.component";
import { Navbar } from "../../components/navbars/navbar.component";
import { useRef, useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { SquareButton as CounterButton } from "../../components/buttons/square-button/square-button.component";

export const CreateCoupon = () => {
  const [quantityCount, setQuantityCount] = useState(1);
  const dateRef = useRef<HTMLInputElement>(null);

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
  return (
    <div>
      <Navbar navbarTitle='New coupon' withBackButton />
      <form className='px-4 py-7'>
        <Input label='Title*' placeholder='Title' type={"text"} name='title' />
        <Input label='Description*' placeholder='Description' type={"text"} name='description' />

        <div className='mb-5'>
          <label className={standardText}>Quantity</label>
          <div className='flex items-center gap-6 mt-4'>
            <CounterButton icon={<FiMinus />} onClick={() => clickButton("subtract")} />
            <p className={standardText}>{quantityCount}</p>
            <CounterButton icon={<FiPlus />} onClick={() => clickButton("add")} />
          </div>
        </div>

        <div className='mb-5'>
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
              required
              min={formatDate(new Date())}
              defaultValue={formatDate(standardExpirationDate)}
              className={`${standardText} bg-offwhite border-0 outline-black p-0 m-0`}
            />
          </div>
        </div>

        <div>
          <label>Choose a coupon color</label>
        </div>
      </form>
    </div>
  );
};
