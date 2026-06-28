"use client";

import { Button } from "@/components/ui/button";
import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";

export default function ProductTableBody() {
  return (
    <TableBody>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Category</TableCell>
        <TableCell>Price</TableCell>
        <TableCell>Stock</TableCell>
        <TableCell>Last Updated</TableCell>
        <TableCell className="flex justify-center gap-2">
          <Button
            size="icon-lg"
            className="rounded-xl bg-yellow-500 hover:bg-yellow-600"
          >
            <Edit color="black" />
          </Button>
          <Button
            size="icon-lg"
            className="rounded-xl bg-red-600 hover:bg-red-700"
          >
            <Trash />
          </Button>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}
