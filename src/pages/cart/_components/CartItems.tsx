"use client";

import { Button } from "@/components/ui/button";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useCreateOrdersMutation } from "@/redux/api/orderApiSlice";
import { onOpenLogin } from "@/redux/reducer/accountSlice";
import { OrdersDataApiRequest } from "@/types";
import { ArrowRight, LogIn, ShoppingCart } from "lucide-react";
import { useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CartItem from "./cartItem";
import { resetCart } from "@/redux/reducer/cartSlice";

const CartItems = () => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  const { cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const storeId = new URLSearchParams(location.search).get("storeId");
  const [createOrders] = useCreateOrdersMutation();

  const totalAmount = useMemo(() => {
    const totalProduct = cartItems.reduce((acc, item) => {
      return acc + item.price;
    }, 0);

    return totalProduct;
  }, [cartItems]);

  const handleCheckout = async () => {
    const ordersInfo: OrdersDataApiRequest = {
      productInfo: cartItems.map((item) => ({
        productName: item.name,
        price: item.price * 100,
        qty: item.qty,
        productId: item._id,
      })),
      totalAmount: totalAmount * 100,
      storeId,
      userId: user?._id,
    };

    try {
      const { id } = await createOrders(ordersInfo).unwrap();
      if (id) {
        dispatch(resetCart());
        navigate(`/order?storeId=${storeId}&success=1`);
        toast.success("Order successful created");
      }
    } catch (error) {
      toast.error("Order failed to be created");
      navigate(`/order?storeId=${storeId}&failed=1`);
      console.error(error);
    }
  };

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
      <div className="flex justify-between items-center">
        <span className="font-bold text-xl">
          Total Amount: &#8377;{totalAmount}
        </span>
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
