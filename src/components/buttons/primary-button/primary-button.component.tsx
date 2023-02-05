interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export const PrimaryButton = ({ title, onClick, className, ...restProps }: IButton) => (
  <button
    className={`font-displayBold text-3xl w-full py-2 drop-shadow-brutal2 rounded-md border-2 border-solid border-black bg-green max-w-[400px] transition duration-75 enabled:active:opacity-80 enabled:active:translate-x-[2px] enabled:active:translate-y-[2px] enabled:active:drop-shadow-removeBrutal disabled:opacity-60 ${className}`}
    onClick={onClick}
    {...restProps}
  >
    {title}
  </button>
);

