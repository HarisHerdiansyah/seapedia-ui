"use client";

import { Fragment } from "react/jsx-runtime";
import { InfiniteData } from "@tanstack/react-query";
import { ProductData } from "@/http/types";
import ProductCard from "./ProductCard";
import ProductPanelSkeleton from "./ProductPanelSkeleton";

type ProductPanelProps = {
  gridSize: number;
  data: InfiniteData<any, unknown> | undefined;
  isLoading: boolean;
};

function EmptyProductFeedback() {
  return (
    <div className="w-full h-16 flex items-center justify-center">
      <p className="text-lg">Product Empty</p>
    </div>
  );
}

export default function ProductPanel({
  gridSize,
  data,
  isLoading,
}: ProductPanelProps) {
  if (isLoading) {
    return <ProductPanelSkeleton gridSize={gridSize} />;
  }

  return (
    <>
      <div className={`grid grid-cols-${gridSize} gap-4 mt-2`}>
        {data?.pages.map((page, index) => (
          <Fragment key={index}>
            {page.data.productData.length === 0 && <EmptyProductFeedback />}
            {page.data.productData.length > 0 &&
              page.data.productData.map((product: ProductData) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </Fragment>
        ))}
      </div>
    </>
  );
}
