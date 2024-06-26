import NoDataPage from "@/components/layout/NoDataPage";
import { ProductsList } from "@/components/product/product-list";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchProducts } from "@/hooks/product/useFetchProducts";
import { Count } from "@/types";
import { Loader as LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function HomePage() {
  const urlParams = new URLSearchParams(window.location.search);
  const storeId = urlParams.get("storeId");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/" && storeId) {
      navigate(`/?storeId=${storeId}`);
    }
  }, [navigate, pathname, storeId]);

  const [pagination, setPagination] = useState({
    pageIndex: Count.PAGE_INDEX,
    pageSize: Count.PAGE_SIZE,
  });

  const {
    products,
    pageInfo: { pageIndex, pageSize, totalDocs, pageCount },
    isProductsFetching,
    isProductsLoading,
  } = useFetchProducts({
    storeId: storeId!,
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
  });

  const handleNextPage = () => {
    setPagination({ ...pagination, pageIndex: pagination.pageIndex + 1 });
  };

  const handlePrevPage = () => {
    setPagination({
      ...pagination,
      pageIndex:
        Math.max(pagination.pageIndex - 1, 0) === 0
          ? 1
          : pagination.pageIndex - 1,
    });
  };

  const formmatedProducts = products.map((product) => ({
    ...product,
    price: product.price / Count.PRICE_CONVERSION,
  }));

  const disabled = isProductsFetching || isProductsLoading;

  const nextDisabled = pageIndex === pageCount || disabled;
  const prevDisabled = pageIndex === Count.PAGE_INDEX || disabled;

  if (disabled) {
    return <Loader />;
  }

  return (
    <div className="mx-auto max-w-7x">
      <div className="space-y-10 pb-10">
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductsList
            prevDisabled={prevDisabled}
            nextDisabled={nextDisabled}
            onPrev={handlePrevPage}
            onNext={handleNextPage}
            title="Products"
            items={formmatedProducts}
            pageInfo={{ pageIndex, pageSize, totalDocs, pageCount }}
          />
        </div>
      </div>
    </div>
  );
}

export const Loader = () => {
  return (
    <div className="relative h-screen w-full flex bg-gray-200/50">
      <NoDataPage description="" info="" title="">
        <LoaderIcon
          size={80}
          className="animate-spin flex size-6 items-center text-primary/40 justify-center"
        />
        <Skeleton className="h-8 w-48" />
      </NoDataPage>
    </div>
  );
};

export default HomePage;
