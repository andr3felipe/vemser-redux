import { cn } from "@/lib/utils";
import { Star } from "@phosphor-icons/react";

export function Rating({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) {
  return (
    <div className={cn("w-min", className)}>
      <div className="flex">
        {[...Array(5)].map((_, index) => {
          const isFilled = index < Math.round(rating);

          if (isFilled) {
            return (
              <Star
                key={index}
                size={"1.5rem"}
                weight="fill"
                className="text-yellow-400"
              />
            );
          }

          return (
            <Star
              key={index}
              size={"1.5rem"}
              weight="regular"
              className="text-yellow-400"
            />
          );
        })}
      </div>
    </div>
  );
}
