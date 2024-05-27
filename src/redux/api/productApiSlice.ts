import { ProductResponse, ProductsResponse } from "@/types/api-types";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      ProductsResponse,
      { storeId: string; pageIndex: number; pageSize: number }
    >({
      query: ({ storeId, ...params }) => ({
        url: `product/${storeId}/products`,
        method: "GET",
        credentials: "include" as const,
        params,
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 60,
    }),
    getProduct: builder.query<ProductResponse, { productId?: string }>({
      query: ({ productId }) => ({
        url: `product/${productId}`,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["Product"],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productApiSlice;
