import ModalProvider from "@/providers/ModalProvider";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <ModalProvider />
      <Outlet />
    </>
  );
};

export default Root;
