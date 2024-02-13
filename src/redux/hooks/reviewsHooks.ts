import { useAppSelector } from "./reduxTypedHooks";

export const useReviews = () => {
  const { reviews } = useAppSelector((state) => state.reviews);
  return reviews;
};

export const useGetReviewsById = ({ id }: { id: number }) => {
  const { reviews } = useAppSelector((state) => state.reviews);
  const productReviews = reviews.find((review) => review.productId === id);

  return productReviews ?? null;
};
