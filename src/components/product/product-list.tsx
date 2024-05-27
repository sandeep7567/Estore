import { ProductI } from "@/types";
import { FC } from "react";
import { ProductCard } from "./product-card";

interface ProductsListProps {
  title: string;
  items: ProductI[];
}

export const ProductsList: FC<ProductsListProps> = ({ title, items }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>
      {items.length === 0 && <>Not Found</>}
      <div className="grid grid-cols-1 sm:grid-cols-2 cursor-pointer md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
        {items.map((item) => (
          <ProductCard
            key={item._id}
            product={item}
            className="w-[300px]"
            aspectRatio="square"
            width={300}
            height={300}
          />
        ))}
      </div>
    </div>
  );
};
