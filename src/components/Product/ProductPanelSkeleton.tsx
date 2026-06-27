import { Skeleton } from "../ui/skeleton";
import ProductSkeleton from "./ProductSkeleton";

type ProductPanelSkeletonProps = {
  gridSize: number;
};

export default function ProductPanelSkeleton({
  gridSize,
}: ProductPanelSkeletonProps) {
  return (
    <>
      <div className={`grid grid-cols-${gridSize} gap-4 mt-2`}>
        {Array.from({ length: gridSize }, (_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
      <div className="flex justify-center my-8">
        <Skeleton className="max-w-40 h-4" />
      </div>
    </>
  );
}
