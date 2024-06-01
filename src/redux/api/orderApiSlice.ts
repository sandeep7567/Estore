import { CheckoutFormDataRequest } from "@/types";
import { MessageResponse } from "@/types/api-types";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrders: builder.mutation<MessageResponse, CheckoutFormDataRequest>({
      query: (order) => ({
        url: `order/${order?.storeId}`,
        method: "POST",
        body: order,
        credentials: "include",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const { useCreateOrdersMutation } = productApiSlice;
