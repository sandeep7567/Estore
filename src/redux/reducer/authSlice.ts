import { User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthType {
  user: null | User;
}

const initialState: AuthType = {
  user: null,
};

const authSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    getUser: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { getUser, logout } = authSlice.actions;

export default authSlice.reducer;
