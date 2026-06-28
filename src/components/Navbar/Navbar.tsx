"use client";

import Link from "next/link";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, UserRound } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

function UnauthenticatedAside() {
  return (
    <>
      <Link href="/carts">
        <Button
          variant="outline"
          size="lg"
          className="border border-primary bg-primary-foreground cursor-pointer"
        >
          <ShoppingCart />
          Cart
        </Button>
      </Link>
      <Link href="/profile/dashboard">
        <Button size="lg" className="cursor-pointer">
          <UserRound />
          Profile
        </Button>
      </Link>
    </>
  );
}

function BuyerAside() {
  return (
    <>
      <Link href="/authentication/register">
        <Button
          variant="outline"
          size="lg"
          className="border border-primary bg-primary-foreground cursor-pointer"
        >
          Sign Up
        </Button>
      </Link>
      <Link href="/authentication/login">
        <Button size="lg" className="cursor-pointer">
          Log In
        </Button>
      </Link>
    </>
  );
}

const AsideMap: Record<string, React.ReactNode> = {
  BUYER: <BuyerAside />,
  SELLER: <UnauthenticatedAside />,
};

export default function Navbar() {
  const { isLoggedIn, activeRole } = useAuth();

  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-16 lg:h-20">
          <div className="shrink-0 flex items-center">
            <Link
              href="/home"
              className="text-2xl font-bold text-primary cursor-pointer"
            >
              Seapedia
            </Link>
          </div>

          {activeRole === "BUYER" && (
            <form className="flex flex-1 max-w-md items-center gap-2 lg:gap-4">
              <Field>
                <Input
                  id="search"
                  name="search"
                  type="text"
                  placeholder="Search products"
                  className="bg-white"
                />
              </Field>
              <Button type="submit">Search</Button>
            </form>
          )}

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <UnauthenticatedAside />
            ) : (
              AsideMap[activeRole as string]
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
