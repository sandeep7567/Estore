"use client";

import { Button } from "@/components/ui/button";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { onOpenLogin } from "@/redux/reducer/accountSlice";
import { ArrowRight, LogIn, ShoppingCart } from "lucide-react";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import CartItem from "./cartItem";

const CartItems = () => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  const { cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const storeId = new URLSearchParams(location.search).get("storeId");

  const totalAmount = useMemo(() => {
    const totalProduct = cartItems.reduce((acc, item) => {
      return acc + item.price;
    }, 0);

    return totalProduct;
  }, [cartItems]);

  if (!cartItems.length) {
    return (
      <div className="flex items-center gap-2">
        <ShoppingCart />
        <p className="text-gray-500">
          Your cart is empty!{" "}
          <Link className="text-orange-500" to={`/?storeId=${storeId}`}>
            continue shopping?
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {cartItems.map((cartItem, i) => {
        return <CartItem key={i} item={cartItem} />;
      })}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <p className="font-bold text-base md:text-xl">
          Total Amount: &#8377;{totalAmount}
        </p>
        {user !== null ? (
          <Button asChild className="w-full md:w-fit">
            <Link to={`/checkout-info?storeId=${storeId}`}>
              Checkout
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        ) : (
          <Button onClick={() => dispatch(onOpenLogin())}>
            Login
            <LogIn size={16} className="ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CartItems;
