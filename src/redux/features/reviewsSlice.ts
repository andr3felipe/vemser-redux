import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
  recommend: boolean;
}

export interface ReviewsState {
  reviews: {
    productId: number;
    reviews: Review[];
  }[];
}

const initialState: ReviewsState = {
  reviews: [],
};

export const ratingsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    reviewProduct: (
      state,
      action: PayloadAction<{ productId: number; review: Review }>
    ) => {
      const productReview = state.reviews.findIndex(
        (review) => review.productId === action.payload.productId
      );

      if (productReview >= 0) {
        state.reviews[productReview].reviews.push(action.payload.review);
      } else {
        state.reviews.push({
          productId: action.payload.productId,
          reviews: [action.payload.review],
        });
      }
    },
    setInitialReviews: (
      state,
      action: PayloadAction<{ productId: number; review: Review }>
    ) => {
      const productReview = state.reviews.findIndex(
        (review) => review.productId === action.payload.productId
      );

      if (productReview === -1) {
        state.reviews.push({
          productId: action.payload.productId,
          reviews: [action.payload.review],
        });
      }
    },
  },
});

export default ratingsSlice.reducer;
export const { reviewProduct, setInitialReviews } = ratingsSlice.actions;
