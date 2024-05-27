"use client";

import { Button } from "@/components/ui/button";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { ArrowRight, LogIn, ShoppingCart } from "lucide-react";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import CartItem from "./cartItem";
import { onOpenLogin } from "@/redux/reducer/accountSlice";

const CartItems = () => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const storeId = new URLSearchParams(location.search).get("storeId");
  const { cartItems } = useAppSelector((state) => state.cart);

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

  const handleCheckout = () => {
    console.log("open checkout page");
  };

  return (
    <div className="flex flex-col gap-8">
      {cartItems.map((cartItem, i) => {
        return <CartItem key={i} item={cartItem} />;
      })}
      <div className="flex justify-between items-center">
        <span className="font-bold text-xl">&#8377;{totalAmount}</span>
        {user !== null ? (
          <Button onClick={handleCheckout}>
            Checkout
            <ArrowRight size={16} className="ml-2" />
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
