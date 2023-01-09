import { Navigate, Outlet } from "react-router-dom";

interface IProtectedRoute {
  isAllowed: unknown;
  redirectPath?: string;
  children?: JSX.Element;
}

export const ProtectedRoute = ({
  isAllowed,
  redirectPath = "/login",
  children,
}: IProtectedRoute) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
