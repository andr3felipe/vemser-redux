import { OrderBy } from "@/components/OrderBy";
import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useStatus,
  useProducts,
  useOrderBy,
} from "@/redux/hooks/productsHooks";
import { useReviews } from "@/redux/hooks/reviewsHooks";

export function Store() {
  const status = useStatus();
  const products = useProducts();
  const orderBy = useOrderBy();

  const reviews = useReviews();

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
      <div className="min-h-screen pb-12 max-w-screen">
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
              <div className="flex flex-wrap items-start justify-center m-auto gap-y-12 gap-x-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="w-[22rem] h-[25rem] rounded-lg bg-muted shadow-md"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
