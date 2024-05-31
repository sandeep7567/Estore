import { ProductI } from "@/types";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { cn, hashTheItem } from "@/lib/utils";
import { addToCart, CartItem } from "@/redux/reducer/cartSlice";
import { ShoppingCart } from "lucide-react";
import { MouseEventHandler, useMemo } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: ProductI;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  width,
  height,
  aspectRatio,
  className,
  ...props
}) => {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cart);

  const alreadyHasInCart = useMemo(() => {
    const currentConfiguration: CartItem = {
      _id: product._id,
      name: product.name,
      imageFile: product.imageFile,
      price: product.price,
      properties: product.properties,
      qty: 1,
    };

    const hash = hashTheItem(currentConfiguration);

    return cartItems.some((item) => item.hash === hash);
  }, [cartItems, product]);

  const handleAddToCart: MouseEventHandler<HTMLButtonElement> = () => {
    const itemToAdd: CartItem = {
      _id: product._id,
      name: product.name,
      imageFile: product.imageFile,
      price: product.price,
      properties: product.properties,
      qty: 1,
    };

    dispatch(addToCart(itemToAdd));

    toast.success("Added to cart successfully");
  };

  return (
    <div
      className={cn(
        "space-y-3 border-2 border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out",
        className
      )}
      {...props}
    >
      <div className="overflow-hidden rounded-md">
        <img
          src={product?.imageFile}
          alt={product.name}
          width={width}
          height={height}
          className={cn(
            "h-auto w-auto object-cover transition-transform duration-300 hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
      </div>
      <div className="space-y-1 text-sm flex justify-between px-2 items-center">
        <h3 className="font-medium leading-none">{product.name}</h3>
        <p className="text-sm text-gray-600">Rs.{product.price}</p>
      </div>
      <div className="flex gap-x-2 justify-center ">
        <Button
          disabled={alreadyHasInCart}
          onClick={handleAddToCart}
          className={cn(
            "flex items-center px-4 py-2 rounded-md font-medium transition-colors",
            alreadyHasInCart
              ? "bg-gray-700 text-white"
              : "bg-blue-600 text-white hover:bg-blue-700"
          )}
        >
          <ShoppingCart size={20} />
          <span className="ml-2">
            {alreadyHasInCart ? "Already in cart" : "Add to cart"}
          </span>
        </Button>
      </div>
    </div>
  );
};
