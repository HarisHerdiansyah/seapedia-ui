"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getStoreProductsFn } from "@/http/store";
import { Fragment } from "react/jsx-runtime";
import { ApiResponse, StoreProductData } from "@/http/types";
import Link from "next/link";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { deleteProductFn } from "@/http/products";
import { toast } from "sonner";

export default function ProductTable() {
  const queryClient = useQueryClient();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["products", "seller"],
      queryFn: ({ pageParam }) =>
        getStoreProductsFn({ page: pageParam, size: 20 }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.data.hasNext) {
          return lastPageParam + 1;
        }
        return undefined;
      },
    });

  const { mutate } = useMutation<any, AxiosError<ApiResponse>, string>({
    mutationFn: (productId: string) => deleteProductFn(productId),
    onSuccess: () => {
      toast.success("Product deleted successfully", { position: "top-right" });
      queryClient.invalidateQueries({ queryKey: ["products", "seller"] });
    },
    onError: (err) => {
      if (err.response) {
        const data = err.response.data;
        toast.error(data.message, { position: "top-right" });
      }
    },
  });

  const onDelete = (productId: string) => {
    mutate(productId);
  };

  return (
    <>
      <Table className="mt-2">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Stock</TableHead>
            <TableHead className="text-center">Last Updated</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.pages.map((page, index) => (
            <Fragment key={index}>
              {page.data.productData.length > 0 &&
                page.data.productData.map((product: StoreProductData) => (
                  <TableRow>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      {new Date(product.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="flex justify-center gap-2">
                      <Link
                        href={{
                          pathname: "/store/products/form",
                          query: {
                            type: "EDIT",
                            id: product.id,
                          },
                        }}
                      >
                        <Button
                          size="icon-lg"
                          className="rounded-xl bg-yellow-500 hover:bg-yellow-600"
                        >
                          <Edit color="black" />
                        </Button>
                      </Link>
                      <Button
                        size="icon-lg"
                        className="rounded-xl bg-red-600 hover:bg-red-700"
                        onClick={() => onDelete(product.id)}
                      >
                        <Trash />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </Fragment>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center my-8">
        <Button
          size="lg"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </Button>
      </div>
    </>
  );
}
