import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import FilterForm from "./FilterForm";
import ProductPanel from "@/components/Product/ProductPanel";
import QueryProductPanel from "./QueryProductPanel";

export default function ProductQueryPage() {
  return (
    <>
      <div className="my-8">
        {/*<h1 className="text-2xl font-bold text-primary">
          Query result found: 128 products
        </h1>*/}
        <div className="mt-2 grid grid-cols-4 gap-8 items-start">
          <Card>
            <CardHeader>
              <CardTitle>Advance Filter:</CardTitle>
            </CardHeader>
            <CardContent>
              <FilterForm />
            </CardContent>
          </Card>
          <div className="col-span-3">
            <QueryProductPanel />
          </div>
        </div>
      </div>
    </>
  );
}
