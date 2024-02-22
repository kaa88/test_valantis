import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './slices/searchSlice';

export const store = configureStore({
   reducer: {
      search: searchSlice
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
