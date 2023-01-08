interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const PrimaryButton = ({ title, disabled, onClick }: IButton) => (
  <button
    className='font-displayBold text-3xl w-full py-2 drop-shadow-brutal2 rounded-md border-2 border-solid border-black bg-green max-w-[400px] active:translate-x-[2px] active:translate-y-[2px] active:drop-shadow-removeBrutal'
    onClick={onClick}
    disabled={disabled}
  >
    {title}
  </button>
);
