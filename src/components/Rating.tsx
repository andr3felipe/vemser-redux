import { Star } from "@phosphor-icons/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { rate } from "@/features/products/productsSlice";

export function Rating({
  rating,
  productId,
}: {
  rating: number;
  productId: number;
}) {
  const [filled, setFilled] = useState(0);
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(rate({ id: productId, rating: filled }));
  }

  return (
    <div className="group/rating w-min">
      <div className="hidden group-hover/rating:flex">
        {[...Array(5)].map((_, index) => {
          const isFilled = index < filled;

          if (isFilled) {
            return (
              <button
                key={index}
                onMouseOver={() => setFilled(index + 1)}
                onClick={handleClick}
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
              onMouseOver={() => setFilled(index + 1)}
              onClick={handleClick}
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
