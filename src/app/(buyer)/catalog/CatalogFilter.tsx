"use client";

import { FieldLabel, FieldSet, Field } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getStoreCategoriesFn } from "@/http/store";
import { CategoryData } from "@/http/types";
import { useRouter, usePathname } from "next/navigation";
import { useImmer } from "use-immer";
import { FormEvent } from "react";

export default function CatalogFilter({ storeId }: { storeId: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const [category, setCategory] = useImmer({
    category: "",
  });

  const { data: categories } = useQuery({
    queryKey: ["store-categories", storeId],
    queryFn: () => getStoreCategoriesFn(storeId),
    select: (data) => data.data,
  });

  const onCategoryChange = (value: string) => {
    setCategory((draft) => {
      draft.category = value;
    });
  };

  const onApply = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`${pathname}?category=${category.category}`);
  };

  const onReset = () => {
    setCategory({ category: "" });
    router.push(pathname);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-border/50 p-6">
      <form onSubmit={onApply}>
        <FieldSet>
          <Field>
            <FieldLabel>Category:</FieldLabel>
            <Select
              value={category.category ?? undefined}
              onValueChange={onCategoryChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((category: CategoryData) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <div className="flex items-center justify-end gap-4">
              <Button variant="secondary" type="button" onClick={onReset}>
                Reset
              </Button>
              <Button type="submit">Apply</Button>
            </div>
          </Field>
        </FieldSet>
      </form>
    </div>
  );
}
