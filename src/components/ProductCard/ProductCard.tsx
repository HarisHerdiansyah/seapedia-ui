import Image from "next/image";
import { MapPin, Star } from "lucide-react";

type ProductCardProps = {
  product: {
    id: string | number;
    productName: string;
    rating: number;
    price: number;
    location: string;
  };
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div
      key={product.id}
      className="rounded-2xl overflow-hidden shadow-sm border border-border/50"
    >
      <div className="relative h-44">
        <Image
          src="https://placehold.co/250/ecfdf5/007a55.avif"
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
        <p className="text-sm line-clamp-2 mb-2">{product.productName}</p>
        <p className="text-base font-semibold text-primary mb-2">
          {product.price}
        </p>
        <p className="text-sm text-gray-500">
          <MapPin className="inline-block text-gray-500" size={14} />{" "}
          {product.location}
        </p>
      </div>
    </div>
  );
}
