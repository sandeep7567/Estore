import { createBrowserRouter } from "react-router-dom";
import Auth from "./components/authentication/Auth";
import Dashboard from "./layouts/Dashboard";
import NonAuth from "./layouts/NonAuth";
import Root from "./layouts/Root";
import CartPage from "./pages/cart/cart";
import CheckoutInfoPage from "./pages/checkout/check-out-info";
import HomePage from "./pages/HomePage";
import { NotFound } from "./components/ui/not-found";
import OrderPage from "./pages/order/order";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Dashboard />,
        children: [
          {
            path: "",
            element: <HomePage />,
          },
          {
            path: "/cart",
            element: <CartPage />,
          },
          {
            path: "/order",
            element: <OrderPage />,
          },
          {
            path: "/checkout-info",
            element: <CheckoutInfoPage />,
          },
          {
            path: "*",
            element: <NotFound />,
            errorElement: <NotFound />,
          },
        ],
      },
      {
        path: "auth",
        element: <NonAuth />,
        children: [
          {
            path: "login",
            element: (
              <Auth
                description="Enter your email below to login to your account"
                title="Login"
                btnTitle="register"
                btnText="Don't have an account?"
                btnLink="/auth/register"
                submitBtnLabel="Login"
                formType="login"
                mode="page"
              />
            ),
          },
          {
            path: "register",
            element: (
              <Auth
                description="Enter your details below to register to your account"
                title="Register"
                btnTitle="login"
                btnText="Already have an account?"
                btnLink="/auth/login"
                submitBtnLabel="Sign up"
                formType="register"
                mode="page"
              />
            ),
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
        errorElement: <NotFound />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
    errorElement: <NotFound />,
  },
]);
