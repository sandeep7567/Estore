import { AccountLoginModal } from "@/components/modals/account-login-modal";
import { AccountRegisterModal } from "@/components/modals/account-register-modal";

const ModalProvider = () => {
  return (
    <>
      <AccountLoginModal />
      <AccountRegisterModal />
    </>
  );
};

export default ModalProvider;
