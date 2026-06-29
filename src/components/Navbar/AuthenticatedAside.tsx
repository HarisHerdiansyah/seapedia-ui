import Link from "next/link";
import { ShoppingCart, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthenticatedAside({ role }: { role: string }) {
  return (
    <>
      {role === "BUYER" && (
        <Link href="/carts" className="w-full md:w-auto">
          <Button
            variant="outline"
            size="lg"
            className="border border-primary bg-primary-foreground cursor-pointer w-full"
          >
            <ShoppingCart />
            Cart
          </Button>
        </Link>
      )}
      <Link href="/profile" className="w-full md:w-auto">
        <Button size="lg" className="cursor-pointer w-full">
          <UserRound />
          Profile
        </Button>
      </Link>
    </>
  );
}
