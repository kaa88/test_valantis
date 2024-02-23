import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    product: productSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
