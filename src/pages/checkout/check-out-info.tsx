import { CheckoutForm } from "@/components/form/checkout-form/CheckoutForm";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { PRICE_CONVERSION } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  FormCheckoutSchema,
  formCheckoutSchema,
} from "@/lib/schema/checkout-schema";
import { useCreateOrdersMutation } from "@/redux/api/orderApiSlice";
import { resetCart } from "@/redux/reducer/cartSlice";
import { CheckoutFormDataRequest } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CheckoutPage: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { cartItems } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const storeId = new URLSearchParams(location.search).get("storeId");

  const [checkoutOrder] = useCreateOrdersMutation();

  const defaultValues = useMemo(
    () => ({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      address: "",
    }),
    [user?.firstName, user?.lastName, user?.email]
  );

  const form = useForm<FormCheckoutSchema>({
    resolver: zodResolver(formCheckoutSchema),
    defaultValues: defaultValues
      ? defaultValues
      : {
          firstName: "",
          lastName: "",
          email: "",
          address: "",
        },
  });

  const totalAmount = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price, 0),

    [cartItems]
  );

  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const orderItems = cartItems.map((item) => {
    const { hash, ...restItem } = item;
    return {
      ...restItem,
      price: item.price * PRICE_CONVERSION,
      productId: item._id,
    };
  });

  const handleSubmit = async (values: FormCheckoutSchema) => {
    const { address, ...userInfo } = values;
    const checkoutFormData: CheckoutFormDataRequest = {
      userId: user?._id,
      storeId: String(storeId),
      userInfo,
      address,
      orderItems,
      totalAmount: totalAmount * PRICE_CONVERSION,
      totalQty,
    };

    try {
      const { id } = await checkoutOrder(checkoutFormData).unwrap();
      if (id) {
        dispatch(resetCart());
        navigate(`/order?storeId=${storeId}&success=1`);
        toast.success("Order successful created");
      }
    } catch (error: unknown) {
      toast.error("Order failed to be created");
      navigate(`/order?storeId=${storeId}&failed=1`);
      console.error(error);
    }
  };

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  return (
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-4xl sm:mx-auto w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-full mx-auto">
            <h1 className="text-2xl font-semibold mb-8">Checkout</h1>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="grid lg:flex gap-4"
              >
                <CheckoutForm />

                <div className="flex-1">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Cart Summary</h2>
                    <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
                      {cartItems.map((item) => (
                        <div
                          key={item._id}
                          className="flex justify-between items-center mb-2"
                        >
                          <div className="text-sm">
                            <img
                              src={item.imageFile}
                              alt={item.name}
                              className="w-10 h-10 inline-block mr-2"
                            />
                            {item.name} x {item.qty}
                          </div>
                          <div className="text-sm font-semibold">
                            &#8377;{item.price.toFixed(2)}
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-between items-center font-semibold border-t pt-2">
                        <div>Total</div>
                        <div> &#8377;{totalAmount.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                  {/* <RegisterForm form={registerForm} /> */}
                  <div className="mt-6">
                    <Button
                      type="submit"
                      className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Checkout
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
