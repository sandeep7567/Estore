import { useGetStoresQuery } from "@/redux/api/storeApiSlice";

export const useFetchStores = () => {
  const {
    data,
    isSuccess: isStoresSuccess,
    isError: isStoresError,
    isFetching: isStoresFetching,
    isLoading: isStoresLoading,
    error: storesError,
  } = useGetStoresQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  return {
    stores: data?.stores,
    isStoresSuccess,
    isStoresError,
    isStoresFetching,
    isStoresLoading,
    storesError: storesError ?? null, // Ensure storesError is never undefined
  };
};
