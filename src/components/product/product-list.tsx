import { ProductI } from "@/types";
import { FC } from "react";
import { Button } from "../ui/button";
import { NotFound } from "../ui/not-found";
import { ProductCard } from "./product-card";

interface PageInfo {
  totalDocs?: number;
  pageIndex?: number;
  pageSize?: number;
  pageCount?: number;
}

interface ProductsListProps {
  title: string;
  items: ProductI[];
  onPrev: () => void;
  onNext: () => void;
  disabled?: boolean;
  prevDisabled: boolean;
  nextDisabled: boolean;
  pageInfo?: PageInfo;
}

export const ProductsList: FC<ProductsListProps> = ({
  title,
  items,
  onNext,
  onPrev,
  prevDisabled,
  nextDisabled,
  pageInfo,
}) => {
  const handleNextPage = () => {
    onNext();
  };

  const handlePrevPage = () => {
    onPrev();
  };

  return (
    <div className="space-y-4">
      <div className="flex">
        <h3 className="font-bold text-3xl flex-1">{title}</h3>
        <div className="flex justify-center items-center gap-4">
          Total Docs:
          <span className="text-accent-foreground font-bold">
            {pageInfo?.totalDocs}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="w-full md:w-fit"
            disabled={prevDisabled}
            onClick={handlePrevPage}
          >
            Previous
          </Button>
          <div className="text-xs lg:text-sm text-muted-foreground">
            {pageInfo?.pageIndex}/{pageInfo?.pageCount}
          </div>
          <Button
            className="w-full md:w-fit"
            variant="outline"
            size="sm"
            disabled={nextDisabled}
            onClick={handleNextPage}
          >
            Next
          </Button>
        </div>
      </div>

      {items.length === 0 && (
        <>
          <NotFound className="" />
        </>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 cursor-pointer md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
        {items.map((item) => (
          <ProductCard
            key={item._id}
            product={item}
            className="w-[250px]"
            aspectRatio="square"
            width={250}
            height={250}
          />
        ))}
      </div>
    </div>
  );
};
