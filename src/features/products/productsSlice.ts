import { Product, products } from "@/db/products";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ProductsState {
  products: Product[];
  orderBy: "default" | "name" | "price" | "rating";
}

const initialState: ProductsState = {
  products: products,
  orderBy: "default",
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setOrderBy: (state, action: PayloadAction<ProductsState["orderBy"]>) => {
      state.orderBy = action.payload;
    },

    rate: (state, action: PayloadAction<{ id: number; rating: number }>) => {
      const product = state.products.findIndex(
        (product) => product.id === action.payload.id
      );

      if (product >= 0) {
        state.products[product].ratings.push(action.payload.rating);

        state.products[product].rating =
          state.products[product].ratings.reduce((acc, curr) => acc + curr, 0) /
          state.products[product].ratings.length;

        console.log("Avaliação: ", state.products[product].rating);
        console.log(
          "Avaliações: ",
          JSON.stringify(state.products[product].ratings)
        );
      }
    },
  },
});

export default productsSlice.reducer;
export const { setOrderBy, rate } = productsSlice.actions;
