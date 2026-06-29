import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import FilterForm from "./FilterForm";
import ProductTable from "./ProductTable";

export default function ProductPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <p className="text-2xl font-semibold text-primary">Manage Products</p>
      <FilterForm />
      <div className="mt-8">
        <Link
          href={{
            pathname: "/store/products/form",
            query: { type: "ADD" },
          }}
        >
          <Button
            variant="default"
            size="lg"
            className="flex items-center gap-2"
          >
            <Plus />
            Add Product
          </Button>
        </Link>
      </div>
      <ProductTable />
    </Suspense>
  );
}
