import { Suspense } from "react";
import ProductForm from "./ProductForm";

export default function ProductFormPage() {
  return (
    <div className="mx-auto p-4">
      <p className="text-2xl font-semibold text-primary">Product Form</p>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductForm />
      </Suspense>
    </div>
  );
}
