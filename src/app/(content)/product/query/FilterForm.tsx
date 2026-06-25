"use client";

import { FieldSet, Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";

const simpleCategories = [
  "Electronics & Gadgets",
  "Clothing & Fashion",
  "Beauty & Care",
  "Home & Living",
  "Health & Wellness",
  "Food & Beverages",
  "Sports & Outdoors",
  "Toys & Hobbies",
  "Automotive",
  "Books & Stationery",
  "Mother & Baby",
  "Pet Supplies",
];

export default function FilterForm() {
  return (
    <form>
      <FieldSet>
        <Field>
          <FieldLabel>Category:</FieldLabel>
          <Combobox items={simpleCategories}>
            <ComboboxInput placeholder="Select a category" />
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Field>
        <Field>
          <FieldLabel>Price Range:</FieldLabel>
          <div className="grid grid-cols-2 gap-2">
            <Input type="number" placeholder="Min" min={0} />
            <Input type="number" placeholder="Max" min={1} />
          </div>
        </Field>
        <Field>
          <FieldLabel>Order:</FieldLabel>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="price-low">Price Low to High</SelectItem>
              <SelectItem value="price-high">Price High to Low</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field className="grid grid-cols-2 gap-2">
          <Button size="lg" variant="secondary">
            Reset
          </Button>
          <Button size="lg" variant="default">
            Apply
          </Button>
        </Field>
      </FieldSet>
    </form>
  );
}
