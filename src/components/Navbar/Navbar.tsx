"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AuthenticatedAside from "./AuthenticatedAside";
import UnauthenticatedAside from "./UnauthenticatedAside";
import SearchInput from "./SearchInput";

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

          <SearchInput />

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <AuthenticatedAside role={activeRole as string} />
            ) : (
              <UnauthenticatedAside />
            )}
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                  {isLoggedIn ? (
                    <AuthenticatedAside role={activeRole as string} />
                  ) : (
                    <UnauthenticatedAside />
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
