import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_URL,
  credentials: "include",
});

export const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Attempt to refresh the token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult.data) {
      // Retry the original request
      result = await baseQuery(args, api, extraOptions);
    } else if (refreshResult.error && refreshResult.error.status === 401) {
      await baseQuery("/auth/logout", api, extraOptions);
    } else {
      await baseQuery("/auth/logout", api, extraOptions);
    }
  }

  return result;
};
