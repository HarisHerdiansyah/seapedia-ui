import { Store } from "lucide-react";
import { Suspense } from "react";
import StoreProfile from "../StoreProfile";
import CatalogFilter from "../CatalogFilter";
import CatalogProductPanel from "../CatalogProductPanel";

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const { storeId } = await params;

  return (
    <div className="max-w-7xl mt-4 mb-8 space-y-4">
      <div className="bg-white rounded-2xl shadow-sm border border-border/50 p-6">
        <div className="flex items-center gap-8">
          <aside className="rounded-full w-36 h-36 bg-primary-foreground flex items-center justify-center">
            <Store className="text-primary" size={72} />
          </aside>
          <StoreProfile storeId={storeId} />
        </div>
      </div>
      <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
        <CatalogFilter storeId={storeId} />
        <CatalogProductPanel storeId={storeId} />
      </Suspense>
    </div>
  );
}
