import { UsersResponse } from "@/types/api-types";
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, { storeId: string }>({
      query: ({ storeId }) => ({
        url: `user/${storeId}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetUsersQuery } = userApiSlice;
