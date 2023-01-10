import { FiCalendar, FiMinus, FiPlus } from "react-icons/fi";
import { Input } from "../../components/input/input.component";
import { Navbar } from "../../components/navbars/navbar.component";
import { useState } from "react";
import { formatDate } from "../../utils/formatDate";

type TCounterAction = "add" | "subtract";

const CounterButton = ({
  action,
  onClick,
}: {
  action: TCounterAction;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => (
  <button
    onClick={onClick}
    className='h-10 w-10 bg-white drop-shadow-brutal flex justify-center items-center border-2 active:translate-x-[2px] active:translate-y-[2px] active:drop-shadow-removeBrutal'
  >
    {action === "add" && <FiPlus />}
    {action === "subtract" && <FiMinus />}
  </button>
);

export const CreateCoupon = () => {
  const [quantityCount, setQuantityCount] = useState(1);
  const standardExpirationDate = new Date();
  standardExpirationDate.setFullYear(standardExpirationDate.getFullYear() + 1);
  const standardText = "font-regularMedium text-lg";

  function clickButton(action: TCounterAction) {
    if (action === "add" && quantityCount < 5) {
      setQuantityCount((prevState) => prevState + 1);
    } else if (action === "subtract" && quantityCount > 1) {
      setQuantityCount((prevState) => prevState - 1);
    }
  }
  return (
    <div>
      <Navbar navbarTitle='New coupon' withBackButton />
      <Input label='Title*' placeholder='Title' type={"text"} name='title' />
      <Input label='Description*' placeholder='Description' type={"text"} name='description' />

      <div>
        <label className={standardText}>Quantity</label>
        <div className='flex items-center gap-6 mt-4'>
          <CounterButton action='subtract' onClick={() => clickButton("subtract")} />
          <p className={standardText}>{quantityCount}</p>
          <CounterButton action='add' onClick={() => clickButton("subtract")} />
        </div>
      </div>

      <div>
        <label className={standardText}>Expiration date</label>
        <div className='flex items-center gap-2'>
          <FiCalendar size={"1.7rem"} />
          <p className={standardText}>{formatDate(standardExpirationDate)}</p>
        </div>
      </div>
    </div>
  );
};
