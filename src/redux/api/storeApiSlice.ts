import { CreateStoreData } from "@/types";
import { MessageResponse } from "@/types/api-types";
import { apiSlice } from "./apiSlice";

export const storeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createStore: builder.mutation<MessageResponse, CreateStoreData>({
      query: (data) => ({
        url: "store",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Auth", "Store"],
    }),
    updateStore: builder.mutation<MessageResponse, CreateStoreData>({
      query: (data) => ({
        url: "store",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Auth", "Store"],
    }),
    getStores: builder.query({
      query: () => ({
        url: "store",
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["Product", "Store"],
    }),
  }),
});

export const {
  useCreateStoreMutation,
  useUpdateStoreMutation,
  useGetStoresQuery,
} = storeApiSlice;
