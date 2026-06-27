"use client";

import { useSearchParams } from "next/navigation";
import { Fragment } from "react/jsx-runtime";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getProductsFn } from "@/http/products";
import { ProductData } from "@/http/types";
import ProductCard from "@/components/ProductCard/ProductCard";
import { Button } from "@/components/ui/button";

export default function ProductPanel() {
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

  if (isLoading) {
    return <p>Loading . . .</p>;
  }

  return (
    <div className="my-16">
      <h1 className="text-2xl font-bold text-primary">Our Recomendations</h1>
      <div className="grid grid-cols-5 gap-4 mt-2">
        {data?.pages.map((page, index) => (
          <Fragment key={index}>
            {page.data.productData.map((product: ProductData) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Fragment>
        ))}
      </div>
      <div className="flex justify-center my-8">
        <Button
          size="lg"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </Button>
      </div>
    </div>
  );
}
