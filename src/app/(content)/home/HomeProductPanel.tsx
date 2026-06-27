"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getProductsFn } from "@/http/products";
import { Button } from "@/components/ui/button";
import ProductPanel from "@/components/Product/ProductPanel";

export default function HomeProductPanel() {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["products", "homepage"],
      queryFn: ({ pageParam }) => getProductsFn({ page: pageParam, size: 20 }),
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
      <ProductPanel gridSize={5} data={data} isLoading={isLoading} />
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
