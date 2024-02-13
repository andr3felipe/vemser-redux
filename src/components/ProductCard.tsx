import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Rating } from "./Rating";

import { Product } from "@/redux/features/productsSlice";
import { NavLink } from "react-router-dom";
import { formatPrice } from "@/lib/utils";
import { useGetReviewsById } from "@/redux/hooks/reviewsHooks";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const reviews = useGetReviewsById({ id: Number(product.id) });

  let averageRating: number = 0;

  if (reviews) {
    averageRating =
      reviews?.reviews.reduce((acc, curr) => acc + curr.rating, 0) /
      reviews?.reviews.length;
  }

  return (
    <NavLink
      to={`/store/product/${product.id}`}
      title="Clique para ver mais detalhes"
      aria-label="Clique para ver mais detalhes"
      className="shadow-md break-all  max-w-[22rem] w-full h-[25rem] rounded-lg"
    >
      <Card className="flex flex-col justify-start w-full h-full gap-4 bg-muted">
        <div>
          <Rating rating={averageRating} className="p-2" />

          <CardHeader className="flex flex-col gap-4 mt-2 border-b border-primary rounded-2xl bg-card">
            <img
              src={product.image}
              alt={product.title}
              className="object-contain w-40 h-40 m-auto"
            />
          </CardHeader>
        </div>

        <CardContent>
          <CardTitle className="text-md text-card-foreground">
            {product.title}
          </CardTitle>
          <CardDescription className="mt-3 font-medium text-green-400 text-md">
            {formatPrice(product.price)}
          </CardDescription>
        </CardContent>
      </Card>
    </NavLink>
  );
}
