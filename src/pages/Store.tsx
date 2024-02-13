import { OrderBy } from "@/components/OrderBy";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts } from "@/redux/features/productsSlice";
import { setInitialReviews } from "@/redux/features/reviewsSlice";
import {
  useStatus,
  useProducts,
  useOrderBy,
} from "@/redux/hooks/productsHooks";
import { useAppDispatch } from "@/redux/hooks/reduxTypedHooks";
import { useReviews } from "@/redux/hooks/reviewsHooks";
import { useEffect } from "react";

export function Store() {
  const status = useStatus();
  const products = useProducts();
  const orderBy = useOrderBy();
  const dispatch = useAppDispatch();
  const reviews = useReviews();

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

  const sortedProducts = [...products]?.sort((a, b) => {
    if (orderBy === "name-asc") {
      return a.title.localeCompare(b.title);
    }

    if (orderBy === "name-desc") {
      return b.title.localeCompare(a.title);
    }

    if (orderBy === "price-asc") {
      return a.price - b.price;
    }

    if (orderBy === "price-desc") {
      return b.price - a.price;
    }

    if (orderBy === "rating") {
      const aReviews = reviews?.find((review) => review.productId === a.id);
      const bReviews = reviews?.find((review) => review.productId === b.id);

      if (aReviews && bReviews) {
        const aRating =
          aReviews.reviews.reduce((acc, curr) => acc + curr.rating, 0) /
          aReviews.reviews.length;
        const bRating =
          bReviews.reviews.reduce((acc, curr) => acc + curr.rating, 0) /
          bReviews.reviews.length;
        return bRating - aRating;
      }
    }

    return a.id - b.id;
  });

  return (
    <>
      <div className="min-h-screen max-w-screen">
        <div className="pl-4 pr-4 pt-12 pb-12 m-auto flex flex-col items-start gap-8 max-w-[1440px] justify-center">
          <h1 className="text-3xl font-bold">Our products</h1>
          <div className="flex items-center justify-end w-full">
            <OrderBy />
          </div>

          <div className="flex flex-wrap items-start justify-center m-auto gap-y-12 gap-x-8">
            {status === "succeeded" ? (
              sortedProducts?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
