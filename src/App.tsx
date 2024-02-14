import "./global.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { useEffect } from "react";
import { fetchProducts } from "./redux/features/productsSlice";
import { useProducts, useStatus } from "./redux/hooks/productsHooks";
import { useAppDispatch } from "./redux/hooks/reduxTypedHooks";
import { setInitialReviews } from "./redux/features/reviewsSlice";

function App() {
  const status = useStatus();
  const products = useProducts();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

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
