"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function SearchInput() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const onSearch = () => {
    if (search.length < 4) {
      toast.error("Search query must be at least 4 characters long.", {
        position: "top-right",
      });
      return;
    }

    router.push(`/product/query?search=${search}`);
  };

  return (
    <div className="flex flex-1 max-w-md items-center gap-2 lg:gap-4">
      <Field>
        <Input
          id="search"
          name="search"
          type="text"
          placeholder="Search products"
          className="bg-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Field>
      <Button onClick={onSearch}>Search</Button>
    </div>
  );
}
