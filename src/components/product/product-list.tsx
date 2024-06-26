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
    <div className="space-y-8 px-0 md:px-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-base md:text-3xl">{title}</h3>
        <div className="flex items-center gap-0 md:gap-2">
          <span className="text-xs w-fit md:text-base">Total Docs:</span>
          <span className="text-blue-600 text-xs md:text-sm mr-1 font-bold">
            {pageInfo?.totalDocs}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={prevDisabled}
            onClick={handlePrevPage}
          >
            Previous
          </Button>
          <div className="text-xs lg:text-sm text-gray-500">
            {pageInfo?.pageIndex}/{pageInfo?.pageCount}
          </div>
          <Button
            variant="outline"
            size="sm"
            disabled={nextDisabled}
            onClick={handleNextPage}
          >
            Next
          </Button>
        </div>
      </div>

      {items.length === 0 ? (
        <NotFound />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {items.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
};
