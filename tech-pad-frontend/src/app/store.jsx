import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

/* Note */

// setupListeners(store.dispatch) is typically called once in your application's store configuration file, and it sets up global event listeners to handle API request lifecycle actions across the entire application. By using this we don't need to handle the lifecycle actions manually in each component.
