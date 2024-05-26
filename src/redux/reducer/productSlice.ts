import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductType {
  isOpen: boolean;
  id?: string;
}

const initialState: ProductType = {
  isOpen: false,
  id: undefined,
};

const productSlice = createSlice({
  initialState,
  name: "store",
  reducers: {
    onToggle: (state) => {
      state.isOpen = !state.isOpen;
    },
    onEditToggle: (state, { payload }: PayloadAction<{ id?: string }>) => {
      state.isOpen = typeof payload.id !== "undefined";
      state.id = payload.id;
    },
  },
});

export const { onToggle, onEditToggle } = productSlice.actions;

export default productSlice.reducer;
