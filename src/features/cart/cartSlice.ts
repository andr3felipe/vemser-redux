import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  description: string;
  category: string;
  image: string;
  rating: number;
  ratings: number[];
}

export interface CartState {
  cart: Product[];
}

const initialState: CartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Product>) => {
      const alreadyInCart = state.cart.findIndex(
        (product) => product.id === action.payload.id
      );

      if (alreadyInCart >= 0) {
        state.cart[alreadyInCart].quantity += 1;
      } else {
        state.cart.push(action.payload);
      }
    },

    remove: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter(
        (product) => product.id !== action.payload
      );
    },

    changeQuantity: (
      state,
      action: PayloadAction<{ id: number; action: "add" | "remove" }>
    ) => {
      const product = state.cart.findIndex(
        (product) => product.id === action.payload.id
      );

      if (action.payload.action === "add") {
        state.cart[product].quantity += 1;
        return;
      }

      if (action.payload.action === "remove") {
        if (state.cart[product].quantity > 1) {
          state.cart[product].quantity -= 1;
          return;
        }
      }
    },
  },
});

export const { add, remove, changeQuantity } = cartSlice.actions;

export default cartSlice.reducer;
