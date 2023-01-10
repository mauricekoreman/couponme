import { useEffect } from "react";
import { FiSettings } from "react-icons/fi";
import { Navbar } from "../../../components/navbars/navbar.component";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

export const CouponFeedLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const activeClass = "font-displayBold text-lg py-2 w-1/2 text-center border-b-4";
  const inactiveClass = "font-displayBold text-lg py-2 w-1/2 text-center opacity-70";

  useEffect(() => {
    if (location.pathname === "/") navigate("/received-coupons");
  }, [location]);

  return (
    <main>
      <Navbar rightIcon={<FiSettings size={"1.7rem"} onClick={() => navigate("/settings")} />} />
      <div className='flex mb-6'>
        <NavLink
          to='/received-coupons'
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          Received coupons
        </NavLink>
        <NavLink
          to='/given-coupons'
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          Given coupons
        </NavLink>
      </div>
      <div className='px-4'>
        <Outlet />
      </div>
    </main>
  );
};
