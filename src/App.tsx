import { Route, Routes } from "react-router-dom";

import { Login } from "./pages/auth/login/login.component";
import { CreateCoupon } from "./pages/create-coupon/create-coupon.component";
import { NotFound } from "./pages/not-found/not-found.component";
import { Register } from "./pages/auth/register/register.component";
import { LinkUser } from "./pages/auth/link-user/link-user.component";
import { CouponScreen } from "./pages/coupon-screen/coupon-screen.component";
import { Settings } from "./pages/settings/settings.component";
import { CouponFeedLayout } from "./pages/coupon-feed/coupon-feed-layout/coupon-feed-layout.component";
import { RequireAuth } from "./utils/require-auth";
import { useAuth } from "./context/auth-context";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />

      {/* Protected routes */}
      <Route element={<RequireAuth />}>
        <Route path='/' element={<CouponFeedLayout />} />
        <Route path='link' element={<LinkUser />} />
        <Route path='new' element={<CreateCoupon />} />
        <Route path='coupon' element={<CouponScreen />} />
        <Route path='settings' element={<Settings />} />
      </Route>

      {/* Catch all */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;

