"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, MapPin, Minus, Plus, ShoppingCart, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const mockProducts = [
  {
    id: 1,
    category: "Electronics & Gadgets",
    productName: "Smartphone Super X Pro 128GB",
    shopName: "Tech Store JKT",
    location: "Jakarta Pusat",
    price: 4500000,
    rating: 4.8,
  },
  {
    id: 2,
    category: "Clothing & Fashion",
    productName: "Kaos Polos Cotton Combed 30s Pria",
    shopName: "FashionHub Official",
    location: "Bandung",
    price: 45000,
    rating: 4.7,
  },
  {
    id: 3,
    category: "Beauty & Care",
    productName: "Serum Wajah Glowing Ekstrak Mawar",
    shopName: "BeautyQueen Kosmetik",
    location: "Surabaya",
    price: 125000,
    rating: 4.9,
  },
  {
    id: 4,
    category: "Home & Living",
    productName: "Sprei Katun Jepang Motif Bunga 180x200",
    shopName: "HomeyHouse",
    location: "Tangerang",
    price: 250000,
    rating: 4.6,
  },
  {
    id: 5,
    category: "Health & Wellness",
    productName: "Vitamin C 1000mg + Zinc (Isi 30 Tablet)",
    shopName: "Apotek Sehat Selalu",
    location: "Semarang",
    price: 55000,
    rating: 4.8,
  },
  {
    id: 6,
    category: "Food & Beverages",
    productName: "Kopi Arabica Gayo Roasting Medium 250gr",
    shopName: "Kopi Nusantara",
    location: "Malang",
    price: 65000,
    rating: 4.9,
  },
  {
    id: 7,
    category: "Sports & Outdoors",
    productName: "Matras Yoga Anti Slip TPE Tebal 8mm",
    shopName: "FitGear Equipment",
    location: "Denpasar",
    price: 150000,
    rating: 4.7,
  },
  {
    id: 8,
    category: "Toys & Hobbies",
    productName: "Action Figure Anime Koleksi Eksklusif",
    shopName: "ToyBox Hobbies",
    location: "Depok",
    price: 350000,
    rating: 4.8,
  },
  {
    id: 9,
    category: "Automotive",
    productName: "Jas Hujan Setelan Motor Anti Rembes",
    shopName: "AutoRide Accessories",
    location: "Bekasi",
    price: 85000,
    rating: 4.5,
  },
  {
    id: 10,
    category: "Books & Stationery",
    productName: "Buku Catatan Jurnal Aesthetic Hardcover",
    shopName: "Pustaka Ilmu",
    location: "Yogyakarta",
    price: 40000,
    rating: 4.9,
  },
  {
    id: 11,
    category: "Mother & Baby",
    productName: "Popok Bayi Celana Size M 40 Pcs",
    shopName: "BabyCare Center",
    location: "Bogor",
    price: 95000,
    rating: 4.8,
  },
  {
    id: 12,
    category: "Pet Supplies",
    productName: "Makanan Kucing Kering Rasa Salmon 1Kg",
    shopName: "PetLover Store",
    location: "Medan",
    price: 48000,
    rating: 4.7,
  },
];

export default function ProductDetailPage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    <>
      <div className="my-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/50">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden">
              <Image
                src="https://placehold.co/400/ecfdf5/007a55.avif"
                alt="Kaos Polos Cotton Combed 30s Pria"
                className="object-cover"
                fill
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 col-span-2 shadow-sm border border-border/50 flex flex-col gap-6">
            <section className="flex flex-col gap-3">
              <h1 className="text-3xl font-bold text-foreground">
                Kaos Polos Cotton Combed 30s Pria
              </h1>
              <article className="space-y-2">
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Star className="text-amber-400" fill="#fbbf24" size={18} />
                    <span>
                      Rating:{" "}
                      <span className="font-semibold text-foreground">4.5</span>
                      /5.0
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="text-primary" size={18} />
                    <span>Location: Jakarta, Indonesia</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <Store className="text-primary" size={18} />
                  <span className="hover:underline cursor-pointer">
                    FashionHub Official
                  </span>
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
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
              <p className="text-3xl font-bold text-primary">Rp 45.000</p>

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
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 mb-8 rounded-2xl bg-white p-4 shadow-sm border border-border/50">
        <p className="text-2xl font-bold text-primary">Featured Products</p>
      </div>

      <div className="mt-8 mb-16">
        <div className="grid grid-cols-5 gap-4 mt-2">
          {mockProducts.map((product) => (
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
                  <Star
                    className="inline-block text-amber-300"
                    fill="#ffd230"
                  />{" "}
                  {product.rating}/5.0
                </p>
                <p className="text-sm line-clamp-2 mb-2">
                  {product.productName}
                </p>
                <p className="text-base font-semibold text-primary mb-2">
                  {product.price}
                </p>
                <p className="text-sm text-gray-500">
                  <MapPin className="inline-block text-gray-500" size={14} />{" "}
                  {product.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
