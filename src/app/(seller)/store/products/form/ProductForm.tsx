"use client";

import {
  Field,
  FieldLabel,
  FieldSet,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getCategoriesFn } from "@/http/categories";
import { createProductFn } from "@/http/products";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryData } from "@/http/types";
import { useImmer } from "use-immer";
import { ChangeEvent, FormEvent } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

type ProductFormType = "ADD" | "EDIT";

type ProductFormState = {
  name: string;
  category: string;
  price: string;
  stock: string;
  description: string;
  image: string;
};

export default function ProductForm() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") as ProductFormType;
  const productId = type === "EDIT" && searchParams.get("id");

  const [productForm, setProductForm] = useImmer<ProductFormState>({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: "",
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesFn,
    select: (data) => data.data,
  });

  const { mutate: createProductMutate } = useMutation({
    mutationFn: createProductFn,
    onSuccess: () => {
      toast.success("Product created successfully");
    },
    onError: () => {
      toast.error("Failed to create product");
    },
  });

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setProductForm((draft) => {
      const name = e.target.name as keyof ProductFormState;
      draft[name] = e.target.value;
    });
  };

  const onSelectChange = (value: string) => {
    setProductForm((draft) => {
      draft.category = value;
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className="mt-8" onSubmit={onSubmit}>
      <FieldSet>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field className="gap-1">
            <FieldLabel htmlFor="name">Product Name</FieldLabel>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter product name"
              value={productForm.name}
              onChange={onInputChange}
            />
            <FieldDescription>
              Product name must be unique and between 10-50 characters.
            </FieldDescription>
          </Field>
          <Field className="gap-1">
            <FieldLabel htmlFor="category">Category</FieldLabel>
            <Select
              onValueChange={onSelectChange}
              value={productForm.category ?? undefined}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((cat: CategoryData) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field className="gap-1">
            <FieldLabel htmlFor="price">Price</FieldLabel>
            <Input
              id="price"
              name="price"
              type="number"
              placeholder="Enter product price"
              min={0}
              value={productForm.price}
              onChange={onInputChange}
            />
            <FieldDescription>Product price must be positive.</FieldDescription>
          </Field>
          <Field className="gap-1">
            <FieldLabel htmlFor="stock">Stock</FieldLabel>
            <Input
              id="stock"
              name="stock"
              type="number"
              placeholder="Enter available stock"
              min={0}
              value={productForm.stock}
              onChange={onInputChange}
            />
            <FieldDescription>
              Product initial stock must be positive or zero.
            </FieldDescription>
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field className="gap-1">
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter product description"
              value={productForm.description}
              onChange={onInputChange}
            />
            <FieldDescription>
              Product description at least have 30 characters.
            </FieldDescription>
          </Field>
          <Field className="gap-1">
            <FieldLabel htmlFor="imageUrl">Image URL</FieldLabel>
            <Input
              id="imageUrl"
              name="imageUrl"
              type="url"
              placeholder="Enter product image URL"
              value={productForm.image}
              onChange={onInputChange}
            />
          </Field>
        </div>

        <Field>
          <Button type="button">Save Product</Button>
        </Field>
      </FieldSet>
    </form>
  );
}
