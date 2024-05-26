import { createSlice } from "@reduxjs/toolkit";

interface StoreType {
  isOpen: boolean;
}

const initialState: StoreType = {
  isOpen: false,
};

const storeSlice = createSlice({
  initialState,
  name: "store",
  reducers: {
    onClose: (state) => {
      state.isOpen = false;
    },
    onOpen: (state) => {
      state.isOpen = true;
    },
  },
});

export const { onClose, onOpen } = storeSlice.actions;

export default storeSlice.reducer;
