import CartItem, { CartItemData } from "./CartItem";
import CartSummary from "./CartSummary";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";

const DUMMY_CART_ITEMS: CartItemData[] = [
  {
    id: "1",
    name: "Fresh Atlantic Salmon Fillet",
    price: 15.99,
    quantity: 2,
    image: "https://placehold.co/400x400/ecfdf5/007a55.avif?text=Salmon",
  },
  {
    id: "2",
    name: "Wild Caught Tiger Prawns",
    price: 24.5,
    quantity: 1,
    image: "https://placehold.co/400x400/ecfdf5/007a55.avif?text=Prawns",
  },
  {
    id: "3",
    name: "Premium Seaweed Snack Pack",
    price: 5.25,
    quantity: 4,
    image: "https://placehold.co/400x400/ecfdf5/007a55.avif?text=Seaweed",
  },
];

export default function CartPage() {
  const hasItems = DUMMY_CART_ITEMS.length > 0;

  return (
    <div className="my-8 max-w-6xl mx-auto px-4">
      {hasItems ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            {DUMMY_CART_ITEMS.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="lg:col-span-1">
            <CartSummary items={DUMMY_CART_ITEMS} />
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-border shadow-sm">
          <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link href="/home">
            <Button size="lg">Start Shopping</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
