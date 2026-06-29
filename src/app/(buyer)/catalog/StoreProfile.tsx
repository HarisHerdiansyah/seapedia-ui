"use client";

import { useQuery } from "@tanstack/react-query";
import { getStoreProfileFn } from "@/http/store";
import { Skeleton } from "@/components/ui/skeleton";

export default function StoreProfile({ storeId }: { storeId: string }) {
  const { data: storeProfile, isLoading } = useQuery({
    queryKey: ["storeProfile", storeId],
    queryFn: () => getStoreProfileFn(storeId),
    select: (data) => data.data,
  });

  if (isLoading) {
    return <Skeleton className="w-full h-10" />;
  }

  return (
    <article className="space-y-4">
      <p className="text-2xl font-semibold">{storeProfile.storeName}</p>
      <div className="space-y-1">
        <p className="text-lg m-0">{storeProfile.ownerEmail}</p>
        <p className="text-lg m-0">{storeProfile.location}</p>
      </div>
    </article>
  );
}
