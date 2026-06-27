import { Card, CardContent } from "@/components/ui/card";
import { Star, UserRound } from "lucide-react";
import { AppReviewData } from "@/http/types";

export default function TestimonialCard({ review }: { review: AppReviewData }) {
  return (
    <Card className="w-full bg-card border border-primary shadow-sm">
      <CardContent>
        <div className="flex items-center gap-4">
          <UserRound className="w-10 h-10" />
          <article>
            <p className="text-base font-semibold">{review.reviewer}</p>
            <div className="flex items-center gap-1.5">
              <Star className="fill-yellow-400 text-yellow-400" size={16} />
              <p>{review.rating}</p>
            </div>
          </article>
        </div>
        <article className="mt-6">
          <p className="text-gray-700 text-justify line-clamp-5">
            {review.content}
          </p>
        </article>
      </CardContent>
    </Card>
  );
}
