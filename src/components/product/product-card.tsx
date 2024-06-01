import { ProductI } from "@/types";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { cn, hashTheItem } from "@/lib/utils";
import { addToCart, CartItem } from "@/redux/reducer/cartSlice";
import { ShoppingCart } from "lucide-react";
import { MouseEventHandler, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

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
  const defaultProperty = product?.properties?.reduce(
    (acc, prop) => ({
      ...acc,
      [prop.name]: String(
        Array.isArray(prop.value) ? prop.value[0] : prop.value
      ),
    }),
    {}
  );

  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cart);
  const [selectedProperty, setSelectedProperty] =
    useState<Record<string, string>>(defaultProperty);

  const alreadyHasInCart = useMemo(() => {
    const currentConfiguration: CartItem = {
      _id: product._id,
      name: product.name,
      imageFile: product.imageFile,
      price: product.price,
      selectedProperty,
      qty: 1,
    };

    const hash = hashTheItem(currentConfiguration);

    return cartItems.some((item) => item.hash === hash);
  }, [cartItems, product, selectedProperty]);

  const handleAddToCart: MouseEventHandler<HTMLButtonElement> = () => {
    const itemToAdd: CartItem = {
      _id: product._id,
      name: product.name,
      imageFile: product.imageFile,
      price: product.price,
      selectedProperty,
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

      <div className="space-y-1 text-sm px-2">
        {product?.properties?.map((prop, i) => (
          <div key={prop._id} className="flex items-center">
            <div className="font-medium flex-1">{prop.name}</div>
            <RadioGroup
              defaultValue={String(
                Array.isArray(prop.value) ? prop.value[0] : prop.value
              )}
              className="flex gap-4"
              onValueChange={(value) =>
                setSelectedProperty((prev) => ({
                  ...prev,
                  [prop.name]: value,
                }))
              }
            >
              {Array.isArray(prop.value) &&
                prop.value.map((value) => (
                  <div
                    key={value + prop._id + i}
                    className="flex items-center gap-2"
                  >
                    <RadioGroupItem
                      value={value}
                      id={value + prop._id + i}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={value + prop._id + i}
                      className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      {value.startsWith("#") && (
                        <span
                          className="w-4 h-4 rounded-full border border-primary mb-1"
                          style={{ backgroundColor: value }}
                        />
                      )}
                      {!value.startsWith("#") && value}
                    </Label>
                  </div>
                ))}
            </RadioGroup>
          </div>
        ))}
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
