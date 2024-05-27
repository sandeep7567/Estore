import { useFetchCartItems } from "@/hooks/store/useFetchCarItems";
import ModalProvider from "@/providers/ModalProvider";
import { Outlet } from "react-router-dom";

const Root = () => {
  useFetchCartItems();
  return (
    <>
      <ModalProvider />
      <Outlet />
    </>
  );
};

export default Root;
