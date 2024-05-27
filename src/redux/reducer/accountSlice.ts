import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccountType {
  isOpenLogin: boolean;
  isOpenRegister: boolean;
}

const initialState: AccountType = {
  isOpenLogin: false,
  isOpenRegister: false,
};

const accountSlice = createSlice({
  initialState,
  name: "account",
  reducers: {
    onCloseLogin: (state) => {
      state.isOpenLogin = false;
    },
    onOpenLogin: (state) => {
      state.isOpenLogin = true;
    },
    onCloseRegister: (state) => {
      state.isOpenRegister = false;
    },
    onOpenRegister: (state) => {
      state.isOpenRegister = true;
    },
    // if (formType === "login") {
    //   dispatch(onCloseLogin());
    //   dispatch(onOpenRegister());
    // } else {
    //   dispatch(onCloseRegister());
    //   dispatch(onOpenLogin());
    onToggle: (
      state,
      action: PayloadAction<{ formType: "login" | "register" }>
    ) => {
      const formType = action.payload.formType;

      if (formType === "login") {
        state.isOpenLogin = false;
        state.isOpenRegister = true;
      } else if (formType === "register") {
        state.isOpenRegister = false;
        state.isOpenLogin = true;
      }
    },
  },
});

export const {
  onCloseLogin,
  onOpenLogin,
  onToggle,
  onCloseRegister,
  onOpenRegister,
} = accountSlice.actions;

export default accountSlice.reducer;
