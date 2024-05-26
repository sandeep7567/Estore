import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authSlice from "./reducer/authSlice";
import storeSlice from "./reducer/storeSlice";
import productSlice from "./reducer/productSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    store: storeSlice,
    product: productSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([apiSlice.middleware]),
  devTools: false,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const initializeApp = async () => {
  const { isError, error } = await store.dispatch(
    apiSlice.endpoints.getUser.initiate({}, { forceRefetch: true })
  );

  if (isError && error && "status" in error && error.status === 401) {
    {
      const { isError, error } = await store.dispatch(
        apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true })
      );

      if (isError && error && "status" in error && error.status === 401) {
        await store.dispatch(
          apiSlice.endpoints.logout.initiate(
            {},
            { fixedCacheKey: "auth-logout", track: true }
          )
        );
      }
    }
  }
};

initializeApp();
