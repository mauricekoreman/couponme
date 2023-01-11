interface ISquareButton {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon: React.ReactNode;
}

export const SquareButton = ({ onClick, icon }: ISquareButton) => (
  <button
    type='button'
    onClick={onClick}
    className='h-10 w-10 bg-white drop-shadow-brutal flex justify-center items-center border-2 active:translate-x-[2px] active:translate-y-[2px] active:drop-shadow-removeBrutal'
  >
    {icon}
  </button>
);
