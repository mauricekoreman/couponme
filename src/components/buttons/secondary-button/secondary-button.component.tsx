interface ISquareButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  textOrIcon: React.ReactNode | string;
  className?: string;
}

export const SecondaryButton = ({ onClick, textOrIcon, className }: ISquareButton) => (
  <button
    type='button'
    onClick={onClick}
    className={`px-3 py-3 bg-white drop-shadow-brutal flex justify-center items-center border-2 cursor-pointer transition duration-75 active:translate-x-[1px] active:translate-y-[1px] active:drop-shadow-removeBrutal ${className}`}
  >
    <p className='font-displayRegular text-lg'>{textOrIcon}</p>
  </button>
);
