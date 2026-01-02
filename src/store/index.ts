import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import languageReducer from "./slices/languageSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    language: languageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
