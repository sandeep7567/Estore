import { Modal } from "@/components/ui/modal";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { onCloseRegister } from "@/redux/reducer/accountSlice";
import Auth from "../authentication/Auth";

export const AccountRegisterModal = () => {
  const { isOpenRegister: isOpen } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  return (
    <Modal
      title=""
      description=""
      isOpen={isOpen}
      onClose={() => dispatch(onCloseRegister())}
    >
      <Auth
        description="Enter your details below to register to your account"
        title="Register"
        btnTitle="login"
        btnText="Already have an account?"
        btnLink="/auth/login"
        submitBtnLabel="Sign up"
        formType="register"
        mode="model"
      />
    </Modal>
  );
};
