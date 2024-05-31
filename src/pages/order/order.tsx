import { Button } from "@/components/ui/button";
import { NotFound } from "@/components/ui/not-found";
import { Link, useLocation } from "react-router-dom";

const OrderPage = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const success = queryParams.get("success");
  const failed = queryParams.get("failed");

  if (success !== null) {
    return (
      <div className="flex flex-col items-center rounded-lg justify-center h-full bg-green-50">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center mx-auto justify-center w-16 h-16 bg-green-100 rounded-full">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-center text-green-800">
            Order Successful
          </h1>
          <p className="mt-2 text-center text-gray-600">
            Your order has been placed successfully!
          </p>
          <Button
            asChild
            className="w-full px-4 py-2 mt-6 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            <Link to={"/"}>Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (failed !== null) {
    return (
      <div className="flex flex-col items-center rounded-lg justify-center h-full bg-red-50">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center mx-auto justify-center w-16 h-16 bg-red-100 rounded-full">
            <svg
              className="w-12 h-12 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-center text-red-800">
            Order Failed
          </h1>
          <p className="mt-2 text-center text-gray-600">
            There was an issue with your order. Please try again.
          </p>
          <Button
            asChild
            className="w-full px-4 py-2 mt-6 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            <Link to={"/cart"}>Try Again</Link>
          </Button>
        </div>
      </div>
    );
  }

  return <NotFound />;
};

export default OrderPage;
