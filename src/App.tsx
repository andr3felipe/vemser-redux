import "./global.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { useEffect } from "react";
import { setProducts } from "./redux/features/productsSlice";
import { useProducts } from "./redux/hooks/productsHooks";
import { useAppDispatch } from "./redux/hooks/reduxTypedHooks";
import { setInitialReviews } from "./redux/features/reviewsSlice";
import { useGetAllProductsQuery } from "./redux/api/fakeStoreApi/fakeStoreApi";

function App() {
  const products = useProducts();
  const dispatch = useAppDispatch();

  const { data, error } = useGetAllProductsQuery();

  if (error) {
    console.error(error);
  }

  useEffect(() => {
    if (data) {
      dispatch(setProducts(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    products?.map((product) => {
      dispatch(
        setInitialReviews({
          productId: product.id,
          review: {
            name: "Anonymous",
            rating: Math.round(product.rating.rate),
            comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            date: JSON.stringify(new Date()),
            recommend: product.rating.rate >= 3,
          },
        })
      );
    });
  }, [products, dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
