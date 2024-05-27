import { useGetProductsQuery } from "@/redux/api/productApiSlice";

interface Query {
  storeId: string;
}

export const useFetchProducts = (query: Query) => {
  const {
    data,
    isSuccess: isProductsSuccess,
    isError: isProductsError,
    isFetching: isProductsFetching,
    isLoading: isProductsLoading,
    error: productsError,
  } = useGetProductsQuery(query, {
    pollingInterval: query.storeId === null ? 1000 : 0,
    refetchOnMountOrArgChange: true,
    skip: query.storeId === null,
  });

  return {
    products: data ? data.products : [],
    isProductsError,
    productsError,
    isProductsFetching,
    isProductsLoading,
    isProductsSuccess,
  };
};
