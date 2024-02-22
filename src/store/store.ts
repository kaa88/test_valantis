import { configureStore } from "@reduxjs/toolkit";
import goodsSlice from "./slices/goodsSlice";

export const store = configureStore({
  reducer: {
    search: goodsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
