import { Skeleton } from "@/components/ui/skeleton";

export default function ProductSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-sm border border-border/50">
      <div className="relative h-44">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="p-4">
        <Skeleton className="mb-2 w-1/4 h-4" />
        <Skeleton className="mb-2 w-1/4 min-h-16" />
        <Skeleton className="mb-2 w-1/4 h-4" />
        <Skeleton className="mb-2 w-1/4 h-4" />
      </div>
    </div>
  );
}
