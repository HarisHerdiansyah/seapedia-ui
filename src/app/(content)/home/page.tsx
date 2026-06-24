import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star, MapPin } from "lucide-react";

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

export default function HomePage() {
  return (
    <>
      <div className="my-8 rounded-2xl relative h-44 overflow-hidden border border-primary">
        <Image
          src="https://placehold.co/1280x180/ecfdf5/007a55.avif"
          alt="Image Placeholder"
          className="object-contain rounded-xl"
          fill
        />
      </div>

      <div className="my-16">
        <h1 className="text-2xl font-bold text-primary">Explore Categories</h1>
        <div className="grid grid-cols-5 gap-4 mt-2">
          {simpleCategories.map((cat) => (
            <Card
              key={cat}
              className="h-full cursor-pointer transition-all duration-300 hover:scale-105 hover:border hover:border-primary hover:bg-primary-foreground"
            >
              <CardContent className="flex h-full items-center justify-center text-center text-base">
                {cat}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="my-16">
        <h1 className="text-2xl font-bold text-primary">Our Recomendations</h1>
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
