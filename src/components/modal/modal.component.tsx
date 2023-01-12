import React, { useEffect } from "react";
import { PrimaryButton } from "../buttons/primary-button/primary-button.component";

interface IModal {
  title?: string;
  close: () => void;
  children: React.ReactNode;
}

export const Modal = ({ title, close, children }: IModal) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className='bg-white border-[3px] border-black rounded-t-2xl h-[90%] w-full fixed bottom-0 left-0 overflow-y-scroll z-10'>
      <div className='flex flex-col items-center bg-white fixed py-3 rounded-t-2xl left-1 right-1'>
        <h3 className='font-displayBold text-3xl text-center mb-3'>{title}</h3>
        <PrimaryButton
          type='button'
          onClick={(e) => {
            e.preventDefault();
            close();
          }}
          title='Close'
          className='w-40 text-xl'
        />
      </div>
      <div className='px-4 mt-32'>{children}</div>
    </div>
  );
};

