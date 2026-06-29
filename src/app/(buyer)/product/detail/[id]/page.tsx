"use client";

import { useImmer } from "use-immer";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getProductDetailFn, getProductsFn } from "@/http/products";
import { ProductDetailData, ProductData } from "@/http/types";
import { Star, MapPin, Minus, Plus, ShoppingCart, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toRupiah } from "@/lib/utils";
import ProductPanelSkeleton from "@/components/Product/ProductPanelSkeleton";
import ProductCard from "@/components/Product/ProductCard";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const {
    data: productData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product-detail", id],
    queryFn: () => getProductDetailFn(id as string),
    enabled: !!id,
    select: (data) => data.data as ProductDetailData,
  });

  const { data: featuredProducts, isLoading: isFeaturedLoading } = useQuery({
    queryKey: ["featured-products", productData?.categoryId],
    queryFn: () =>
      getProductsFn({
        category: productData?.categoryId,
        size: 5,
        page: 0,
        order: "NEWEST",
      }),
    enabled: !!productData?.category,
    select: (data) => data.data.productData as ProductData[],
  });

  const [isExpanded, setIsExpanded] = useImmer(false);
  const [quantity, setQuantity] = useImmer(1);

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  if (isLoading) {
    return (
      <div className="my-8 mx-auto text-center py-20">Loading product...</div>
    );
  }

  if (isError || !productData) {
    return (
      <div className="my-8 mx-auto text-center py-20">
        Failed to load product details.
      </div>
    );
  }

  return (
    <>
      <div className="my-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/50">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden">
              <Image
                src={
                  productData.imageUrl ||
                  "https://placehold.co/400/ecfdf5/007a55.avif"
                }
                alt={productData.name}
                className="object-cover"
                loading="eager"
                fill
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 col-span-2 shadow-sm border border-border/50 flex flex-col gap-6">
            <section className="flex flex-col gap-3">
              <h1 className="text-3xl font-bold text-foreground">
                {productData.name}
              </h1>
              <article className="space-y-2">
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Star className="text-amber-400" fill="#fbbf24" size={18} />
                    <span>
                      Rating:{" "}
                      <span className="font-semibold text-foreground">
                        {productData.rating}
                      </span>
                      /5.0
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="text-primary" size={18} />
                    <span>Location: {productData.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <Store className="text-primary" size={18} />
                  <Link href={`/catalog/${productData.storeId}`}>
                    <span className="hover:underline cursor-pointer">
                      {productData.storeName}
                    </span>
                  </Link>
                </div>
              </article>
            </section>

            <Separator />

            <section className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold text-foreground">
                Description
              </h2>
              <div>
                <p
                  className={`text-muted-foreground leading-relaxed ${!isExpanded ? "line-clamp-2" : ""}`}
                >
                  {productData.description}
                </p>
                <Button
                  variant="link"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="px-0 h-auto text-primary font-medium mt-1"
                >
                  {isExpanded ? "See less" : "See more"}
                </Button>
              </div>
            </section>

            <section className="mt-auto pt-4 flex flex-col gap-5">
              <p className="text-3xl font-bold text-primary">
                {toRupiah(productData.price)}
              </p>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    className="h-12 w-12 rounded-xl"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <span className="w-8 text-center font-semibold text-foreground text-lg">
                    {quantity}
                  </span>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleIncrement}
                    className="h-12 w-12 rounded-xl"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button size="lg" className="flex-1 h-12 ">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>
            </section>

            <Separator />

            <div className="mt-auto pt-4 flex flex-col gap-5">
              <p className="text-xl font-semibold">Categories</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {productData.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 mb-8 rounded-2xl bg-white p-4 shadow-sm border border-border/50">
        <p className="text-2xl font-bold text-primary">Featured Products</p>
      </div>

      <div className="mt-8 mb-16">
        {isFeaturedLoading ? (
          <ProductPanelSkeleton gridSize={5} />
        ) : (
          <div className="grid grid-cols-5 gap-4 mt-2">
            {featuredProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
