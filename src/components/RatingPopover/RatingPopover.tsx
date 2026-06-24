"use client"; // Tambahkan ini jika kamu menggunakan Next.js App Router

import { useState } from "react";
import { MessageCircleMore, Star } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
} from "@/components/ui/popover";

export default function RatingPopover() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    console.log("Submitted:", { rating, comment });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="fixed right-10 bottom-10 bg-primary hover:bg-chart-5 transition-all duration-300 cursor-pointer w-16 h-16 flex items-center justify-center rounded-full shadow-lg">
          <MessageCircleMore className="text-white w-7 h-7" />
        </div>
      </PopoverTrigger>

      <PopoverContent align="end" side="top" className="w-80 p-5 mb-4">
        <PopoverHeader className="mb-4">
          <PopoverTitle className="font-semibold text-lg">
            Application Review
          </PopoverTitle>
        </PopoverHeader>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-700">Rating:</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-7 h-7 transition-colors ${
                      star <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="comment"
              className="text-sm font-medium text-gray-700"
            >
              Comment:
            </label>
            <textarea
              id="comment"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="You may share your experience with us"
              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="w-full py-2.5 mt-2 text-sm font-semibold text-white bg-primary rounded-md hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Send Review
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
