import { useAppSelector } from "./reduxTypedHooks";

export const useCart = () => {
  const { cart } = useAppSelector((state) => state.cart);
  return cart;
};
