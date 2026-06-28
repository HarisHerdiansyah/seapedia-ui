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
import {
  createProductFn,
  getProductDetailFn,
  updateProductFn,
} from "@/http/products";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApiResponse, CategoryData, ProductPayload } from "@/http/types";
import { useImmer } from "use-immer";
import { ChangeEvent, FormEvent } from "react";
import { toast } from "sonner";
import { redirect, useSearchParams } from "next/navigation";
import { AxiosError } from "axios";

type ProductFormType = "ADD" | "EDIT";

type ProductFormState = {
  name: string;
  category: string;
  price: string;
  stock: string;
  description: string;
  imageUrl: string;
};

export default function ProductForm() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") as ProductFormType;
  const isEdit = type === "EDIT";
  const productId = searchParams.get("id");

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesFn,
    select: (data) => data.data,
  });

  const { data: productDetail } = useQuery({
    queryKey: ["product-detail"],
    queryFn: () => getProductDetailFn(productId as string),
    enabled: isEdit,
    select: (data) => data.data,
  });

  const { mutate: createProductMutate, isPending: isAddPending } = useMutation<
    any,
    AxiosError<ApiResponse>,
    ProductPayload
  >({
    mutationFn: createProductFn,
    onSuccess: () => {
      toast.success("Product created successfully", { position: "top-right" });
      redirect("/store/products");
    },
    onError: (err) => {
      if (err.response) {
        const data = err.response.data;
        toast.error(data.message, { position: "top-right" });
      }
    },
  });

  const { mutate: updateProductMutate, isPending: isUpdatePending } =
    useMutation<
      any,
      AxiosError<ApiResponse>,
      { productId: string; payload: ProductPayload }
    >({
      mutationFn: ({
        productId,
        payload,
      }: {
        productId: string;
        payload: ProductPayload;
      }) => updateProductFn(productId, payload),
      onSuccess: () => {
        toast.success("Product updated successfully", {
          position: "top-right",
        });
        redirect("/store/products");
      },
      onError: (err) => {
        if (err.response) {
          const data = err.response.data;
          toast.error(data.message, { position: "top-right" });
        }
      },
    });

  const [productForm, setProductForm] = useImmer<ProductFormState>({
    name: isEdit ? productDetail.name : "",
    category: "",
    price: isEdit ? productDetail.price : "",
    stock: isEdit ? productDetail.stock : "",
    description: isEdit ? productDetail.description : " ",
    imageUrl: "",
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
    const payload: ProductPayload = {
      categoryId: productForm.category,
      name: productForm.name,
      price: Number(productForm.price),
      stock: Number(productForm.stock),
      description: productForm.description,
    };

    if (isEdit && productId) {
      updateProductMutate({ productId: productId, payload });
      return;
    }
    createProductMutate(payload);
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
              value={productForm.imageUrl}
              onChange={onInputChange}
            />
          </Field>
        </div>

        <Field>
          {isEdit ? (
            <Button type="submit" disabled={isUpdatePending}>
              {isUpdatePending ? "Updating ...." : "Update Product"}
            </Button>
          ) : (
            <Button type="submit" disabled={isAddPending}>
              {isAddPending ? "Creating ...." : "Create Product"}
            </Button>
          )}
        </Field>
      </FieldSet>
    </form>
  );
}
