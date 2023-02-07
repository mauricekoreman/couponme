import { FiChevronRight } from "react-icons/fi";

interface ITextButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  icon?: JSX.Element;
  subtext?: string;
  withNavigateButton?: boolean;
}

export const TextButton = ({
  title,
  onClick,
  className,
  icon,
  subtext,
  withNavigateButton = true,
  ...restProps
}: ITextButton) => (
  <button
    className={`font-regularMedium text-xl w-full max-w-[400px] py-2 transition duration-100 active:opacity-70 ${className}`}
    onClick={onClick}
    {...restProps}
  >
    <div className='flex items-center text-left gap-4'>
      {icon}
      {title}
      {withNavigateButton && <FiChevronRight size={"1.8rem"} className={"ml-auto"} />}
    </div>
    <p className={"font-regularMedium text-xs text-left mt-1 max-w-[37ch] text-black opacity-60"}>
      {subtext}
    </p>
  </button>
);




