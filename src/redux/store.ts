import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "@/redux/features/productsSlice";
import cartReducer from "@/redux/features/cartSlice";
import reviewsReducer from "./features/reviewsSlice";
import { fakeStoreApi } from "./api/fakeStoreApi/fakeStoreApi";
import { reqresApi } from "./api/reqresApi/reqresApi";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    reviews: reviewsReducer,
    [fakeStoreApi.reducerPath]: fakeStoreApi.reducer,
    [reqresApi.reducerPath]: reqresApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      fakeStoreApi.middleware,
      reqresApi.middleware
    ),
});
