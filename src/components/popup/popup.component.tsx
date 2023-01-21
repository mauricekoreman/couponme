import { useState } from "react";
import { PrimaryButton } from "../buttons/primary-button/primary-button.component";

export interface IPopup {
  title: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  open: boolean;
}

export const Popup = ({ title, onClick, open }: IPopup) => {
  const [poupOpen, setPopupClose] = useState(open);

  return poupOpen ? (
    <div className='absolute min-h-screen min-w-full flex justify-center items-center bg-black bg-opacity-20'>
      <div className='bg-white border-2 rounded-lg drop-shadow-brutal2 min-w-[20rem] w-[80%] max-w-[40rem] min-h-fit p-4 '>
        <h1 className='font-displayRegular text-2xl text-center mb-10'>{title}</h1>
        <div className='flex items-center justify-center gap-2'>
          <PrimaryButton
            title='Cancel'
            onClick={() => setPopupClose(false)}
            className='text-xl !bg-white'
          />
          <PrimaryButton title='Confirm' onClick={onClick} className='text-xl' />
        </div>
      </div>
    </div>
  ) : null;
};

