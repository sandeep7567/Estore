import {
  CartItem as CartItemsProps,
  removeFromCart,
  updateCart,
} from "@/redux/reducer/cartSlice";
import { X } from "lucide-react";

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
      handleRemoveFromCart(item._id);
      return;
    }

    if (item.qty >= 1 && item.qty <= 5) {
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

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart({ productId }));

    toast.success("Rmoved from cart successfully");
  };

  const maxValue = Math.max(...[1, 2, 3, 4, 5]);

  const disabled = item.qty === maxValue;

  return (
    <>
      <div className="grid grid-cols-2">
        <div className="w-3/4 flex items-center">
          <img src={item.imageFile} alt={item.name} width={100} height={100} />
          <div className="flex gap-12 ml-6 w-full">
            <div className="flex-1">
              <h2 className="font-bold">{item.name}</h2>
              <h3 className="text-xs text-gray-500">{item.price}</h3>
              <h3 className="text-xs text-gray-500">{item.price}</h3>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 justify-between">
          <QtyChanger disabled={disabled} handleQtyChange={handleQtyChange}>
            {item.qty}
          </QtyChanger>

          <div className="flex">
            <div className="font-bold w-12">&#8377;{item.price}</div>
            <button
              className="ml-4"
              onClick={() => handleRemoveFromCart(item._id)}
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
