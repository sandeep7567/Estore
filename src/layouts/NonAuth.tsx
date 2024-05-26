import { useAppSelector } from "@/hooks/redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const NonAuth = () => {
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (user !== null) {
    const redirect =
      new URLSearchParams(location.search).get("redirect") || "/";

    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};

export default NonAuth;
