import { Modal } from "@/components/ui/modal";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { onCloseLogin } from "@/redux/reducer/accountSlice";
import Auth from "../authentication/Auth";

export const AccountLoginModal = () => {
  const { isOpenLogin: isOpen } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  return (
    <Modal
      title=""
      description=""
      isOpen={isOpen}
      onClose={() => dispatch(onCloseLogin())}
    >
      <Auth
        description="Enter your email below to login to your account"
        title="Login"
        btnTitle="register"
        btnText="Don't have an account?"
        btnLink="/auth/register"
        submitBtnLabel="Login"
        formType="login"
        mode="model"
      />
    </Modal>
  );
};
