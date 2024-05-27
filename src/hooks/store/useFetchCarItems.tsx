import { setInitialCartItems } from "@/redux/reducer/cartSlice";
import { store } from "@/redux/store";

export const useFetchCartItems = () => {
  const isLocalStorageAvailable =
    typeof window !== "undefined" && window.localStorage;

  if (isLocalStorageAvailable) {
    const cartItems = window.localStorage.getItem("cartItems");

    try {
      const parsedItems = cartItems && JSON.parse(cartItems);
      store.dispatch(setInitialCartItems(parsedItems));
    } catch (err) {
      console.error(err);
    }
  }
};
