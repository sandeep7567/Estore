import { useGetUsersQuery } from "@/redux/api/userApiSlice";

interface Query {
  storeId: string;
}

export const useFetchUsers = (query: Query) => {
  const {
    data,
    isSuccess: isUsersSuccess,
    isError: isUsersError,
    isFetching: isUsersFetching,
    isLoading: isUsersLoading,
    error: usersError,
  } = useGetUsersQuery(query, {
    pollingInterval: 3600000, // 1 hr
    refetchOnMountOrArgChange: true,
    skip: !query?.storeId,
  });

  return {
    users: data ? data.users : [],
    isUsersSuccess,
    isUsersError,
    isUsersFetching,
    isUsersLoading,
    usersError,
  };
};
