import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface INavbar {
  navbarTitle?: string;
  withTitle?: boolean;
  withBackButton?: boolean;
  rightIcon?: React.ReactNode;
  backButtonFunction?: () => void;
  marginBottom?: number;
}

export const Navbar = ({
  navbarTitle = "CouponMe",
  withTitle = true,
  withBackButton = false,
  rightIcon,
  backButtonFunction,
  marginBottom = 2,
}: INavbar) => {
  const navigate = useNavigate();

  return (
    <nav
      className='h-14 flex space-between items-center relative'
      style={{ marginBottom: `${marginBottom}rem` }}
    >
      {withBackButton && (
        <FiArrowLeft
          onClick={backButtonFunction ? backButtonFunction : () => navigate(-1)}
          size={"2rem"}
          className={`absolute left-[1rem] cursor-pointer transition duration-75 active:opacity-70`}
        />
      )}
      {withTitle && <h1 className='font-displayBold text-2xl text-center flex-1'>{navbarTitle}</h1>}
      {rightIcon && (
        <div
          className={`absolute right-[1rem] cursor-pointer transition duration-75 active:opacity-70`}
        >
          {rightIcon}
        </div>
      )}
    </nav>
  );
};














