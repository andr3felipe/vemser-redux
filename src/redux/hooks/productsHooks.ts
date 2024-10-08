import { Product } from "../api/fakeStoreApi/types";
import { useAppSelector } from "./reduxTypedHooks";

export const useProducts = () => {
  const { products } = useAppSelector((state) => state.products);
  return products;
};

export const useGetProductById = ({ id }: { id: number }) => {
  const { products } = useAppSelector((state) => state.products);
  const product = products.find((product: Product) => product.id === id);

  return product ?? null;
};

export const useOrderBy = () => {
  const { orderBy } = useAppSelector((state) => state.products);
  return orderBy;
};
