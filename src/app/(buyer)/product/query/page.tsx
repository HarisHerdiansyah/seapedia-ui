import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Suspense } from "react";

import FilterForm from "./FilterForm";
import ProductPanel from "@/components/Product/ProductPanel";
import QueryProductPanel from "./QueryProductPanel";

export default function ProductQueryPage() {
  return (
    <Suspense fallback={<div className="my-8 text-center">Loading query results...</div>}>
      <div className="my-8">
        <div className="mt-2 grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filter Products
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-75 sm:w-100 overflow-y-auto"
              >
                <div className="pt-6">
                  <h2 className="text-lg font-bold mb-4">Advance Filter:</h2>
                  <FilterForm />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Filter */}
          <div className="hidden lg:block">
            <Card>
              <CardHeader>
                <CardTitle>Advance Filter:</CardTitle>
              </CardHeader>
              <CardContent>
                <FilterForm />
              </CardContent>
            </Card>
          </div>

          <div className="col-span-1 lg:col-span-3">
            <QueryProductPanel />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
