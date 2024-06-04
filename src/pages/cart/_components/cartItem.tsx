import {
  CartItem as CartItemsProps,
  removeFromCart,
  updateCart,
} from "@/redux/reducer/cartSlice";
import { X } from "lucide-react";

import { LIMIT } from "@/constants";
import { useFetchProduct } from "@/hooks/product/useFetchProduct";
import { useAppDispatch } from "@/hooks/redux";
import { toast } from "sonner";
import QtyChanger from "./qtyChanger";

interface ICartItem {
  item: CartItemsProps;
}

const CartItem = ({ item }: ICartItem) => {
  const dispatch = useAppDispatch();
  const { product } = useFetchProduct(item._id);

  const handleQtyChange = (value: number) => {
    const copyQty = JSON.parse(JSON.stringify(item.qty)) + value;
    if (!copyQty) {
      handleRemoveFromCart(item.hash!);
      return;
    }

    if (item.qty >= LIMIT.MIN_QTY && item.qty <= LIMIT.MAX_QTY) {
      if (product?.price) {
        const updateItem: CartItemsProps = {
          ...item,
          qty: copyQty,
          price: product?.price ? product.price / 100 : 0,
        };
        dispatch(updateCart(updateItem));
      }
    }
  };

  const handleRemoveFromCart = (hash: string) => {
    dispatch(removeFromCart({ hash }));

    toast.success("Rmoved from cart successfully");
  };

  const maxValue = Math.max(...[LIMIT.MIN_QTY, 2, 3, 4, 5, LIMIT.MAX_QTY]);

  const disabled = item.qty === maxValue;
  const selectedProperties = Object.entries(item.selectedProperty);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="w-3/4 flex flex-col md:flex-row gap-4 items-center">
          <img
            className="w-full md:w-1/2 lg:w-1/4"
            src={item.imageFile}
            alt={item.name}
            width={100}
            height={100}
          />
          <div className="flex flex-col gap-2 ml-0 md:ml-6 w-full">
            <h2 className="font-bold">{item.name}</h2>
            <div className="text-xs flex flex-wrap text-gray-500">
              {selectedProperties?.map(([key, value]) => (
                <div
                  className="flex justify-start gap-2 items-center"
                  key={key}
                >
                  <p className="font-medium">{key}</p>
                  <div className="flex mb-2 mr-2">
                    {value && value.startsWith("#") ? (
                      <div
                        style={{
                          backgroundColor: value,
                        }}
                        className="flex flex-col items-center justify-center rounded-md border-2 border-border bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      />
                    ) : (
                      <div className="flex flex-col items-center font-bold text-pretty text-primary justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-primary/8 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                        {value}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 justify-between">
          <QtyChanger disabled={disabled} handleQtyChange={handleQtyChange}>
            {item.qty}
          </QtyChanger>

          <div className="flex">
            <div className="font-bold w-12"> &#8377;{item.price}</div>
            <button
              className="ml-4"
              onClick={() => handleRemoveFromCart(item.hash!)}
            >
              <X />
            </button>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default CartItem;
