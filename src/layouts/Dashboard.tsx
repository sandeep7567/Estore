import Header from "@/components/dashboard/Header";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useLogoutMutation } from "@/redux/api/apiSlice";
import { onClose } from "@/redux/reducer/storeSlice";
import { Home, Package2, ShoppingCart } from "lucide-react";
import React, { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { toast } from "sonner";

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useAppDispatch();

  const navLinks = [
    {
      to: "",
      icon: Home,
      label: "Home",
      active: location.pathname === "/",
    },
    {
      to: `/cart`,
      icon: ShoppingCart,
      label: "Cart",
      active: location.pathname === `/cart`,
    },
  ];

  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);

  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      toast(`Logged out successfully`);
    } catch (error) {
      console.error("Logout failed", error);
      toast(`Couldn't log out`);
    }
  };

  useEffect(() => {
    if (user && user.storeId.length > 0) {
      dispatch(onClose());
    }
  }, [dispatch, user]);

  const stores = [{ _id: "1", name: "Dashboard" }];

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[250px_1fr]">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link
          to="/"
          className="flex text-primary items-center gap-2 font-semibold"
        >
          <Package2 className="h-6 w-6" />
          <span className="">Dashboard CMS</span>
        </Link>
      </div>
      <div className="flex flex-col">
        <Header
          stores={stores}
          user={user ? user : null}
          handleLogout={handleLogout}
          showNewTeamDialog={showNewTeamDialog}
          setShowNewTeamDialog={setShowNewTeamDialog}
          navLinks={navLinks}
          disabled={isLoading}
        />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
