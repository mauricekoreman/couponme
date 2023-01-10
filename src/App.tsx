import { useAuth } from "./context/auth-context";
import { useUser } from "./context/user-context";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/auth/login/login.component";
import { Loading } from "./pages/loading/loading.component";
import { Settings } from "./pages/settings/settings.component";
import { NotFound } from "./pages/not-found/not-found.component";
import { Register } from "./pages/auth/register/register.component";
import { LinkUser } from "./pages/auth/link-user/link-user.component";
import { CouponScreen } from "./pages/coupon-screen/coupon-screen.component";
import { CreateCoupon } from "./pages/create-coupon/create-coupon.component";
import { ProtectedRoute } from "./components/protected-route/protected-route";
import { CouponFeedLayout } from "./pages/coupon-feed/coupon-feed-layout/coupon-feed-layout.component";
import { GivenCoupons } from "./pages/coupon-feed/given-coupons/given-coupons.component";
import { ReceivedCoupons } from "./pages/coupon-feed/received-coupons/received-coupons.component";

function App() {
  const { userLoaded, user } = useAuth();
  const { userData, userDataLoading } = useUser();

  if (!userLoaded || userDataLoading) {
    return <Loading />;
  } else {
    return (
      <Routes>
        {/* Only accessible for non-authenticated users */}
        <Route element={<ProtectedRoute isAllowed={!!!user} redirectPath='/' />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>

        {/* Only accessible for authenticated users that are not linked */}
        <Route element={<ProtectedRoute isAllowed={!!user && !userData?.linked} />}>
          <Route path='link' element={<LinkUser />} />
        </Route>

        {/* Only accessible for authenticated users */}
        <Route
          element={
            <ProtectedRoute
              isAllowed={!!user && userData?.linked}
              redirectPath={!userData?.linked ? "/link" : "/login"}
            />
          }
        >
          <Route path='/' element={<CouponFeedLayout />}>
            <Route index element={<GivenCoupons />} />
            <Route path='given-coupons' element={<GivenCoupons />} />
            <Route path='received-coupons' element={<ReceivedCoupons />} />
          </Route>
          <Route path='new' element={<CreateCoupon />} />
          <Route path='coupon' element={<CouponScreen />} />
          <Route path='settings' element={<Settings />} />
        </Route>

        {/* Catch all */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    );
  }
}

export default App;








