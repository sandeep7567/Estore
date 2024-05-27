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
    const currentConfiguration = {
      _id: product._id,
      name: product.name,
      imageFile: product.imageFile,
      price: product.price,
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
      qty: 1,
    };

    dispatch(addToCart(itemToAdd));

    toast.success("Added to cart successfully");
  };

  return (
    <div
      className={cn(
        "space-y-3 border-2 border-black rounded-lg p-1",
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
            "h-auto w-auto object-cover transition-all hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
      </div>
      <div className="space-y-1 text-sm flex justify-between px-4 items-center">
        <h3 className="font-medium leading-none">{product.name}</h3>
        <p className="text-sm text-muted-foreground">Rs.{product.price}</p>
      </div>
      <div className="flex gap-x-6 justify-center ">
        <Button
          disabled={alreadyHasInCart}
          onClick={handleAddToCart}
          className={alreadyHasInCart ? "bg-gray-700" : "bg-primary"}
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
