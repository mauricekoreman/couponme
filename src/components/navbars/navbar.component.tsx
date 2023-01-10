import { FiArrowLeft, FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface INavbar {
  navbarTitle?: string;
  withTitle?: boolean;
  withBackButton?: boolean;
  rightIcon?: React.ReactNode;
}

export const Navbar = ({
  navbarTitle = "CouponMe",
  withTitle = true,
  withBackButton = false,
  rightIcon,
}: INavbar) => {
  const navigate = useNavigate();
  const xPadding = "1rem";

  return (
    <nav className='py-3 flex space-between items-center'>
      {withBackButton && (
        <FiArrowLeft
          onClick={() => navigate(-1)}
          size={"2rem"}
          className={`absolute left-[${xPadding}]`}
        />
      )}
      {withTitle && <h1 className='font-displayBold text-2xl text-center flex-1'>{navbarTitle}</h1>}
      {rightIcon && <div className={`absolute right-[${xPadding}]`}>{rightIcon}</div>}
    </nav>
  );
};
