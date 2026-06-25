"use client";

import { ChangeEvent } from "react";
import { MessageCircleMore, Star } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useMutation } from "@tanstack/react-query";
import { useImmer } from "use-immer";
import { submitAppReviewFn } from "@/http/app-review";
import { AppReviewPayload, ApiResponse } from "@/http/types";
import { AxiosError } from "axios";
import { toast } from "sonner";

type RatingState = {
  rating: number;
  hoverRating: number;
  reviewer: string;
  content: string;
};

export default function RatingPopover() {
  const [ratingState, setRatingState] = useImmer<RatingState>({
    rating: 0,
    hoverRating: 0,
    reviewer: "",
    content: "",
  });
  const { mutate, isPending } = useMutation<
    any,
    AxiosError<ApiResponse>,
    AppReviewPayload
  >({
    mutationFn: submitAppReviewFn,
    onSuccess: (data) => {
      const payload = data.data;
      toast.success(payload.message, { position: "top-right" });
    },
    onError: (err) => {
      if (err.response) {
        const data = err.response.data;
        toast.error(data.message, { position: "top-right" });
      }
    },
  });

  const onRatingChange = (star: number) => {
    setRatingState((draft) => {
      draft.rating = star;
    });
  };

  const onHoverRatingChange = (star: number) => {
    setRatingState((draft) => {
      draft.hoverRating = star;
    });
  };

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRatingState((draft) => {
      const name = e.target.name as keyof RatingState;
      if (name == "content" || name == "reviewer") {
        draft[name] = e.target.value;
      }
    });
  };

  const handleSubmit = () => {
    const payload: AppReviewPayload = {
      reviewer: ratingState.reviewer,
      rating: ratingState.rating,
      content: ratingState.content,
    };
    mutate(payload);
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
                  onClick={() => onRatingChange(star)}
                  onMouseEnter={() => onHoverRatingChange(star)}
                  onMouseLeave={() => onHoverRatingChange(0)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-7 h-7 transition-colors ${
                      star <= (ratingState.hoverRating || ratingState.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="reviewer"
              className="text-sm font-medium text-gray-700"
            >
              Reviewer Name (Optional):
            </Label>
            <Input
              id="reviewer"
              name="reviewer"
              type="text"
              value={ratingState.reviewer}
              onChange={onInputChange}
            />
          </div>

          <Separator />

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="content"
              className="text-sm font-medium text-gray-700"
            >
              Content:
            </Label>
            <Textarea
              id="content"
              name="content"
              rows={3}
              value={ratingState.content}
              onChange={onInputChange}
              placeholder="You may share your experience with us"
              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={ratingState.rating === 0 || isPending}
            // className="w-full py-2.5 mt-2 text-sm font-semibold text-white bg-primary rounded-md hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isPending ? "Submitting..." : "Send Review"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
