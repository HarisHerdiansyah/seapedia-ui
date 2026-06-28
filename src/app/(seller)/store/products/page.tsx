import { Button } from "@/components/ui/button";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";
import Link from "next/link";
import FilterForm from "./FilterForm";
import ProductTableBody from "./ProductTableBody";

export default function ProductPage() {
  return (
    <>
      <p className="text-2xl font-semibold text-primary">Manage Products</p>
      <FilterForm />
      <div className="mt-8">
        <Link
          href={{
            pathname: "/seller/store/products",
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
      <Table className="mt-2">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Stock</TableHead>
            <TableHead className="text-center">Last Updated</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <ProductTableBody />
      </Table>
    </>
  );
}
