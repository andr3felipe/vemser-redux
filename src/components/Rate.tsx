import { Star } from "@phosphor-icons/react";
import { useState } from "react";

interface RateProps {
  handleRating: (rating: number) => void;
  rating: number;
}

export function Rate({ handleRating, rating }: RateProps) {
  const [filled, setFilled] = useState(0);

  return (
    <div className="group/rating w-min">
      <div className="hidden group-hover/rating:flex">
        {[...Array(5)].map((_, index) => {
          const isFilled = index < filled;

          if (isFilled) {
            return (
              <button
                type="button"
                key={index}
                onMouseOver={() => setFilled(index + 1)}
                onClick={() => handleRating(index + 1)}
              >
                <Star
                  className="cursor-pointer"
                  size={"1.5rem"}
                  weight="fill"
                />
              </button>
            );
          }

          return (
            <button
              key={index}
              type="button"
              onMouseOver={() => setFilled(index + 1)}
              onClick={() => handleRating(index + 1)}
            >
              <Star
                className="cursor-pointer"
                size={"1.5rem"}
                weight="regular"
              />
            </button>
          );
        })}
      </div>

      <div className="flex group-hover/rating:hidden">
        {[...Array(5)].map((_, index) => {
          const isFilled = index < rating;

          if (isFilled) {
            return <Star key={index} size={"1.5rem"} weight="fill" />;
          }

          return <Star key={index} size={"1.5rem"} weight="regular" />;
        })}
      </div>
    </div>
  );
}
