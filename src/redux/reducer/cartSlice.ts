import { hashTheItem } from "@/lib/utils";
import { ProductI } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem
  extends Pick<
    ProductI,
    "_id" | "name" | "price" | "imageFile" | "properties"
  > {
  qty: number;
  hash?: string;
}

export interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const hash = hashTheItem(action.payload);

      const newItem = {
        ...action.payload,
        hash: hash,
      };

      window.localStorage.setItem(
        "cartItems",
        JSON.stringify([...state.cartItems, newItem])
      );

      return {
        cartItems: [...state.cartItems, newItem],
      };
    },
    updateCart: (state, action: PayloadAction<CartItem>) => {
      const cartItem = { ...action.payload };
      const isAvailable = state.cartItems.some(
        (item) => item.hash === cartItem.hash
      );
      const { price, ...rest } = cartItem;
      const updatePrice = price * cartItem.qty;
      if (isAvailable) {
        const updatedItem = state.cartItems.map((item) => {
          if (item.hash === cartItem.hash) {
            return {
              ...item,
              price: updatePrice,
              ...rest,
            };
          }
          return {
            ...item,
          };
        });

        window.localStorage.removeItem("cartItems");
        window.localStorage.setItem("cartItems", JSON.stringify(updatedItem));

        state.cartItems = updatedItem;
      }
    },
    removeFromCart: (state, action: PayloadAction<{ productId: string }>) => {
      const filterdRemovedItem = state.cartItems.filter(
        (item) => item._id !== action.payload.productId
      );

      window.localStorage.removeItem("cartItems");
      window.localStorage.setItem(
        "cartItems",
        JSON.stringify(filterdRemovedItem)
      );

      state.cartItems = filterdRemovedItem;
    },
    setInitialCartItems: (state, action: PayloadAction<CartItem[]>) => {
      if (action.payload !== null) {
        state.cartItems = action.payload;
      } else {
        state.cartItems = [];
      }
    },
  },
});

export const { addToCart, setInitialCartItems, updateCart, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
