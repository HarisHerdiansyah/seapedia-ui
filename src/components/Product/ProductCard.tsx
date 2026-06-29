import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { ProductData } from "@/http/types";
import { toRupiah } from "@/lib/utils";

type ProductCardProps = {
  product: ProductData;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div
      key={product.id}
      className="rounded-2xl overflow-hidden shadow-sm border border-border/50"
    >
      <div className="relative h-44">
        <Image
          src={product.imageUrl}
          alt="Product"
          className="object-cover"
          fill
        />
      </div>
      <div className="p-4">
        <p className="text-sm text-right font-semibold mb-2">
          <Star className="inline-block text-amber-300" fill="#ffd230" />{" "}
          {product.rating}/5.0
        </p>
        <Link
          href={`/product/detail/${product.id}`}
          className="text-sm line-clamp-2 mb-2 min-h-10 hover:underline cursor-pointer"
        >
          {product.name}
        </Link>
        <p className="text-base font-semibold text-primary mb-2">
          {toRupiah(product.price)}
        </p>
        <p className="text-sm text-gray-500">
          <MapPin className="inline-block text-gray-500" size={14} />{" "}
          {product.location}
        </p>
      </div>
    </div>
  );
}
