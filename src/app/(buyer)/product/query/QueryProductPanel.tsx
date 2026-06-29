"use client";

import { useSearchParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getProductsFn } from "@/http/products";
import { Button } from "@/components/ui/button";
import ProductPanel from "@/components/Product/ProductPanel";

export default function QueryProductPanel() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "";
  const order = searchParams.get("order") ?? "";
  const minPrice = searchParams.get("minPrice") ?? "0";
  const maxPrice = searchParams.get("maxPrice") ?? "";

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["products", "query", { category, order, minPrice, maxPrice }],
      queryFn: ({ pageParam }) => {
        const payload = Object.fromEntries(
          Object.entries({ category, order, minPrice, maxPrice }).filter(
            ([key, value]) => {
              if (key === "minPrice" || key === "maxPrice") {
                if (value !== "" && Number(value) >= 0) return true;
              }

              if (key === "category" || key == "order") {
                if (value !== "" && value !== null) return true;
              }

              return false;
            },
          ),
        );
        return getProductsFn({ ...payload, page: pageParam, size: 20 });
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.data.hasNext) {
          return lastPageParam + 1;
        }
        return undefined;
      },
    });

  return (
    <>
      <ProductPanel gridSize={4} data={data} isLoading={isLoading} />
      <div className="flex justify-center my-8">
        <Button
          size="lg"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </Button>
      </div>
    </>
  );
}
