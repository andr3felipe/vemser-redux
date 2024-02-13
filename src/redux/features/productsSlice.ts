import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

export interface ProductsState {
  products: Product[];
  orderBy:
    | "default"
    | "name-asc"
    | "name-desc"
    | "price-asc"
    | "price-desc"
    | "rating";
  status: "idle" | "loading" | "succeeded" | "failed";
  filterBy:
    | "electronics"
    | "jewelery"
    | "men's clothing"
    | "women's clothing"
    | "all";
  error: null | string;
}

const initialState: ProductsState = {
  products: [],
  orderBy: "default",
  filterBy: "all",
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(BASE_URL + "/products").catch((err) => {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        return Promise.reject(axiosError.response?.data);
      }

      return Promise.reject(err);
    });

    return response.data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setOrderBy: (state, action: PayloadAction<ProductsState["orderBy"]>) => {
      state.orderBy = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "loading";
    }),
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.products = action.payload;
      });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message ?? "Algo deu errado";
    });
  },
});

export default productsSlice.reducer;
export const { setOrderBy } = productsSlice.actions;
