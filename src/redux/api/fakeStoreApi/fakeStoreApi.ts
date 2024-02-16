import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "./types";

export const fakeStoreApi = createApi({
  reducerPath: "fakeStoreApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], void>({
      query: () => `products`,
    }),
  }),
});

export const { useGetAllProductsQuery } = fakeStoreApi;
