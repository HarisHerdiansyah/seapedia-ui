"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getStoreCatalogFn } from "@/http/store";
import { Button } from "@/components/ui/button";
import ProductPanel from "@/components/Product/ProductPanel";
import { useSearchParams } from "next/navigation";
import { ProductParams } from "@/http/types";

export default function CatalogProductPanel({ storeId }: { storeId: string }) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "";

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["store-catalog", { storeId, category }],
      queryFn: ({ pageParam }) => {
        const params: ProductParams = { page: pageParam, size: 20 };
        if (category) {
          params.category = category;
        }
        return getStoreCatalogFn(storeId, params);
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
