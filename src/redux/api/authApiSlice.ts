import { LoginCredentials, RegisterCredentials } from "@/types";
import { MessageResponse } from "@/types/api-types";
import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation<MessageResponse, RegisterCredentials>({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Auth"],
    }),
    login: builder.mutation<MessageResponse, LoginCredentials>({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useRegistrationMutation, useLoginMutation } = authApiSlice;
