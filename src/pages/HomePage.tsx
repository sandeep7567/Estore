import { ProductsList } from "@/components/product/product-list";
import { useFetchProducts } from "@/hooks/product/useFetchProducts";
import { Count } from "@/types";
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
    <div className="h-screen w-screen  flex justify-center items-center">
      <div className="border-collapse border-t-2 h-40 aspect-square w-40 animate-spin  border-blue-500 rounded-full flex justify-center items-center" />
    </div>
  );
};

export default HomePage;
