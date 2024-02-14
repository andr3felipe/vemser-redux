import { Rating } from "./Rating";
import dayjs from "dayjs";

export interface ReviewProps {
  review: {
    name: string;
    rating: number;
    comment: string;
    date: string;
    recommend: boolean;
  };
}
export function Review({ review }: ReviewProps) {
  const date = dayjs(JSON.parse(review.date)).format("D [de] MMM[.] [de] YYYY");

  return (
    <div className="flex flex-col flex-1 gap-1 pb-4 border-b-2 basis-[18.75rem]">
      <Rating rating={review.rating} />
      <p>{review.comment}</p>

      <div className="flex flex-col mt-2">
        <p>
          {review.name}
          <span className="ml-2 text-xs text-gray-700">{date}</span>
        </p>

        {review.recommend && (
          <p className="text-green-700">I recommend this product!</p>
        )}
        {!review.recommend && (
          <p className="text-red-700">I don't recommend this product!</p>
        )}
      </div>
    </div>
  );
}
