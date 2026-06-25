"use client";

import ProductCard from "@/components/ProductCard/ProductCard";
import { Button } from "@/components/ui/button";

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

export default function QueryGrid() {
  return (
    <div className="col-span-3">
      <div className="grid grid-cols-4 gap-4">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex justify-center my-8">
        <Button size="lg">Load More</Button>
      </div>
    </div>
  );
}
