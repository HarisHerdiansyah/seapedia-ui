import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import TestimonialCard from "@/components/TestimonialCard/TestimonialCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import ProductPanel from "@/components/Product/ProductPanel";
import { serverApiClient } from "@/http/interceptor";
import { AppReviewData, CategoryData } from "@/http/types";

export default async function HomePage() {
  const categoriesResponse = await serverApiClient.get("/categories");
  const categories = categoriesResponse.data.data;

  const appReviewResponse = await serverApiClient.get("/app-review");
  const appReviews = appReviewResponse.data.data;

  return (
    <>
      <div className="my-8 rounded-2xl relative h-44 overflow-hidden border border-primary">
        <Image
          src="https://placehold.co/1280x180/ecfdf5/007a55.avif"
          alt="Image Placeholder"
          className="object-contain rounded-xl"
          fill
        />
      </div>

      <div className="my-16">
        <h1 className="text-2xl font-bold text-primary">Explore Categories</h1>
        <div className="grid grid-cols-5 gap-4 mt-2">
          {categories.map((cat: CategoryData) => (
            <Card
              key={cat.id}
              className="h-full cursor-pointer transition-all duration-300 hover:scale-105 hover:border hover:border-primary hover:bg-primary-foreground"
            >
              <CardContent className="flex h-full items-center justify-center text-center text-base">
                {cat.name}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="my-16">
        <h1 className="text-2xl font-bold text-primary">Our Recommendations</h1>
        <ProductPanel gridSize={5} />
      </div>

      <div className="my-16">
        <h1 className="text-2xl font-bold text-primary">
          What they said about SEAPEDIA
        </h1>
        <Carousel
          className="mt-2"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {appReviews.map((review: AppReviewData) => (
              <CarouselItem key={review.id} className="basis-1/3">
                <TestimonialCard review={review} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
}
