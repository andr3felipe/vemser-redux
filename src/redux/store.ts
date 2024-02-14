import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "@/redux/features/productsSlice";
import cartReducer from "@/redux/features/cartSlice";
import reviewsReducer from "./features/reviewsSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    reviews: reviewsReducer,
  },
});
