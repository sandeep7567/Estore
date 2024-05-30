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
          <div className="flex flex-col gap-2 ml-6 w-full">
            <h2 className="font-bold">{item.name}</h2>
            <div className="text-xs text-gray-500">
              {item.properties.map((prop) => (
                <div
                  className="flex justify-start gap-6  items-center"
                  key={prop._id}
                >
                  <p className="font-medium">{prop.name}</p>
                  <div className="flex gap-2 mb-2">
                    {Array.isArray(prop.value)
                      ? prop.value.map((v, i) => {
                          if (v.startsWith("#")) {
                            return (
                              <span
                                style={{
                                  width: 12,
                                  height: 12,
                                  borderRadius: `50%`,
                                  backgroundColor: v,
                                  marginLeft: 4,
                                  border: "1px solid black",
                                }}
                                key={v + i}
                              />
                            );
                          }

                          return (
                            <span
                              style={{
                                marginLeft: 4,
                                color: "white",
                                padding: 2,
                                border: "1px solid black",
                                backgroundColor: "black",
                                fontSize: 12,
                                borderRadius: "50%",
                              }}
                              key={v + i}
                            >
                              {v}
                            </span>
                          );
                        })
                      : prop.value}
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
