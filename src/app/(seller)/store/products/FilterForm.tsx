"use client";

import { useImmer } from "use-immer";
import { FieldSet, Field, FieldLabel, FieldGroup, FieldLegend } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CategoryData, OrderProductType } from "@/http/types";
import { getCategoriesFn } from "@/http/categories";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, FormEvent } from "react";
import { toast } from "sonner";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

type FilterFormState = {
  category: string | null;
  minPrice: string;
  maxPrice: string;
  order: OrderProductType | null;
};

const initialFilterState: FilterFormState = {
  category: null,
  minPrice: "0",
  maxPrice: "",
  order: null,
};

export default function FilterForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesFn,
    select: (data) => data.data,
  });

  const [filterForm, setFilterForm] = useImmer<FilterFormState>({
    category: searchParams.get("category") || initialFilterState.category,
    minPrice: searchParams.get("minPrice") || initialFilterState.minPrice,
    maxPrice: searchParams.get("maxPrice") || initialFilterState.maxPrice,
    order:
      (searchParams.get("order") as OrderProductType) ||
      initialFilterState.order,
  });

  const onCategoryChange = (value: string) => {
    setFilterForm((draft) => {
      draft.category = value;
    });
  };

  const onPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterForm((draft) => {
      const name = e.target.name as keyof FilterFormState;
      if (name === "minPrice" || name === "maxPrice") {
        draft[name] = e.target.value;
      }
    });
  };

  const onOrderChange = (value: OrderProductType) => {
    setFilterForm((draft) => {
      draft.order = value;
    });
  };

  const cleanUpParam = (object: FilterFormState) => {
    return Object.fromEntries(
      Object.entries(object).filter(([key, value]) => {
        if (key === "minPrice" || key === "maxPrice") {
          if (value !== "" && Number(value) >= 0) return true;
        }

        if (key === "category" || key == "order") {
          if (value !== "" && value !== null) return true;
        }

        return false;
      }),
    ) as Record<string, string>;
  };

  const onApply = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      filterForm.maxPrice !== "" &&
      Number(filterForm.minPrice) >= Number(filterForm.maxPrice)
    ) {
      toast.error("Minimum price cannot be greater than maximal price", {
        position: "top-right",
      });
      return;
    }

    const requestParam = new URLSearchParams(
      cleanUpParam(filterForm),
    ).toString();
    router.push(`${pathname}?${requestParam}`);
  };

  const onReset = () => {
    const requestParam = new URLSearchParams(
      cleanUpParam(initialFilterState),
    ).toString();
    setFilterForm(initialFilterState);
    router.push(`${pathname}?${requestParam}`);
  };

  return (
    <form className="my-4" onSubmit={onApply}>
      <FieldSet>
        <FieldLegend>Advance Filter</FieldLegend>
        <FieldGroup className="grid grid-cols-4 gap-4">
          <Field>
            <FieldLabel>Category:</FieldLabel>
            <Select
              onValueChange={onCategoryChange}
              value={filterForm.category ?? undefined}
            >
              <SelectTrigger className="w-full">
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
          <Field>
            <FieldLabel>Order:</FieldLabel>
            <Select
              onValueChange={onOrderChange}
              value={filterForm.order ?? undefined}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NEWEST">Newest</SelectItem>
                <SelectItem value="OLDEST">Oldest</SelectItem>
                <SelectItem value="PRICE_ASC">Price Low to High</SelectItem>
                <SelectItem value="PRICE_DESC">Price High to Low</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel>Min Price</FieldLabel>
            <Input
              id="minPrice"
              name="minPrice"
              type="number"
              className="w-full"
              placeholder="Min"
              min={0}
              value={String(filterForm.minPrice)}
              onChange={onPriceChange}
            />
          </Field>
          <Field>
            <FieldLabel>Max Price</FieldLabel>
            <Input
              id="maxPrice"
              name="maxPrice"
              type="number"
              className="w-full"
              placeholder="Max"
              min={0}
              value={String(filterForm.maxPrice)}
              onChange={onPriceChange}
            />
          </Field>
        </FieldGroup>
        <FieldGroup className="flex flex-row items-center justify-end gap-2 mt-4">
          <Button size="lg" variant="secondary" onClick={onReset} type="button">
            Reset
          </Button>
          <Button size="lg" variant="default" type="submit">
            Apply
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
