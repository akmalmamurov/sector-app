import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  total?: number;
  value?: number;
  onChange?: (rating: number) => void;
}

export function StarRating({
  total = 5,
  value = 0,
  onChange,
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex gap-1">
      {Array.from({ length: total }, (_, i) => {
        const starValue = i + 1;
        const isFilled =
          hovered !== null ? starValue <= hovered : starValue <= value;

        return (
          <button
            key={starValue}
            type="button"
            onMouseEnter={() => setHovered(starValue)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onChange?.(starValue)}
            className="p-1"
          >
            <Star
              className={cn("w-[28.5px] h-[26.7px] transition-colors", {
                "fill-[#FBCE13] text-[#FBCE13]": isFilled,
                "text-muted-foreground": !isFilled,
              })}
            />
          </button>
        );
      })}
    </div>
  );
}
