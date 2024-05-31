import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import accountSlice from "./reducer/accountSlice";
import authSlice from "./reducer/authSlice";
import cartSlice from "./reducer/cartSlice";
import productSlice from "./reducer/productSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    account: accountSlice,
    product: productSlice,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([apiSlice.middleware]),
  devTools: false,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

let refreshTimeoutId: NodeJS.Timeout; // Store the timeout ID
const refreshTimer = () => {
  clearTimeout(refreshTimeoutId);
  const refreshTime = 3595000;

  const timeoutId = setTimeout(async () => {
    await refreshAccessToken();
  }, refreshTime);

  refreshTimeoutId = timeoutId;
};

const refreshAccessToken = async () => {
  try {
    await store.dispatch(
      apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true })
    );
  } catch (error) {
    console.log(error);
  } finally {
    // Schedule the next refresh after the refresh time elapses
    refreshTimer();
  }
};

const initializeApp = async () => {
  await store.dispatch(
    apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true })
  );

  await store.dispatch(
    apiSlice.endpoints.getUser.initiate({}, { forceRefetch: true })
  );
};

initializeApp();
