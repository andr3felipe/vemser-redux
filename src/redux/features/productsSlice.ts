import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../api/fakeStoreApi/types";

export interface ProductsState {
  products: Product[];
  orderBy:
    | "default"
    | "name-asc"
    | "name-desc"
    | "price-asc"
    | "price-desc"
    | "rating";
  filterBy:
    | "electronics"
    | "jewelery"
    | "men's clothing"
    | "women's clothing"
    | "all";
}

const initialState: ProductsState = {
  products: [],
  orderBy: "default",
  filterBy: "all",
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setOrderBy: (state, action: PayloadAction<ProductsState["orderBy"]>) => {
      state.orderBy = action.payload;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
});

export default productsSlice.reducer;
export const { setOrderBy, setProducts } = productsSlice.actions;
