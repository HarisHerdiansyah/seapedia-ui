"use client";

import { Button } from "@/components/ui/button";
import {
  FieldLabel,
  FieldSet,
  Field,
  FieldGroup,
  FieldLegend,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function FilterForm() {
  return (
    <form className="my-4">
      <FieldSet>
        <FieldLegend>Advance Filter</FieldLegend>
        <FieldGroup className="grid grid-cols-4 gap-4">
          <Field>
            <FieldLabel>Category</FieldLabel>
            <Input type="text" className="w-full" />
          </Field>
          <Field>
            <FieldLabel>Order</FieldLabel>
            <Input type="text" className="w-full" />
          </Field>
          <Field>
            <FieldLabel>Min Price</FieldLabel>
            <Input type="text" className="w-full" />
          </Field>
          <Field>
            <FieldLabel>Max Price</FieldLabel>
            <Input type="text" className="w-full" />
          </Field>
        </FieldGroup>
        <FieldGroup className="flex flex-row items-center justify-end flex-4">
          <Button size="lg" variant="secondary" type="button">
            Reset
          </Button>
          <Button size="lg" variant="default">
            Apply
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
