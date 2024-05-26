import { useGetProductQuery } from "@/redux/api/productApiSlice";

export const useFetchProduct = (productId?: string) => {
  const {
    data,
    isSuccess: isProductSuccess,
    isError: isProductError,
    isFetching: isProductFetching,
    isLoading: isProductLoading,
    error: productError,
  } = useGetProductQuery(
    { productId },
    {
      skip: !productId,
      refetchOnMountOrArgChange: true,
    }
  );

  return {
    product: data?.product,
    isProductError,
    productError,
    isProductFetching,
    isProductLoading,
    isProductSuccess,
  };
};
