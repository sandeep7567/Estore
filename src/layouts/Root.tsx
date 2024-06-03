import { useFetchCartItems } from "@/hooks/store/useFetchCarItems";
// import { usePreventDevTools } from "@/hooks/ui/usePreventDevtools";
import ModalProvider from "@/providers/ModalProvider";
import { Outlet } from "react-router-dom";

const Root = () => {
  // usePreventDevTools();
  useFetchCartItems();
  return (
    <>
      <ModalProvider />
      <Outlet />
    </>
  );
};

export default Root;
