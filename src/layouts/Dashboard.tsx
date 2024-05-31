import Header from "@/components/dashboard/Header";
import { NotFound } from "@/components/ui/not-found";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useFetchStores } from "@/hooks/store/useFetchStores";
import { useLogoutMutation } from "@/redux/api/apiSlice";
import { onOpenLogin } from "@/redux/reducer/accountSlice";
import { Home, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { toast } from "sonner";

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { cartItems } = useAppSelector((state) => state.cart);
  const location = useLocation();
  const { stores, isStoresLoading, isStoresError } = useFetchStores();
  const dispatch = useAppDispatch();

  const navLinks = [
    {
      to: "/",
      icon: Home,
      label: "Home",
      active: location.pathname === "/",
    },
    {
      to: `/cart`,
      icon: ShoppingCart,
      label: "Cart",
      active: location.pathname === `/cart`,
      badgeCount: cartItems.length,
    },
  ];

  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false);

  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      toast(`Logged out successfully`);
      dispatch(onOpenLogin());
    } catch (error) {
      console.error("Logout failed", error);
      toast(`Couldn't log out`);
    }
  };

  if (isStoresLoading) {
    return null;
  }

  if (isStoresError) {
    return <NotFound />;
  }

  return (
    <div id="1" className="grid min-h-screen w-full">
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
