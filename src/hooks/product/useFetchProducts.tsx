import { useGetProductsQuery } from "@/redux/api/productApiSlice";

interface Query {
  storeId: string;
  pageIndex: number;
  pageSize: number;
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
    skip: query.storeId === null,
    refetchOnMountOrArgChange: true,
  });

  return {
    products: data ? data.products : [],
    pageInfo: data
      ? {
          totalDocs: data.totalDocs,
          pageIndex: data.pageIndex,
          pageSize: data.pageSize,
          pageCount: data.pageCount,
        }
      : {
          totalDocs: 10,
          pageIndex: 1,
          pageSize: 10,
          pageCount: 4,
        },
    isProductsError,
    productsError,
    isProductsFetching,
    isProductsLoading,
    isProductsSuccess,
  };
};
