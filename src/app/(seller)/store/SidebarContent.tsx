"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { LogOut, Store, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { logoutFn } from "@/http/authentication";

export default function SidebarContent() {
  const { logout } = useAuth();

  const { mutate: onLogout } = useMutation({
    mutationFn: logoutFn,
    onSuccess: () => {
      logout();
      window.location.href = "/home";
    },
  });

  return (
    <div
      id="card"
      className="bg-white rounded-2xl shadow-sm border border-border/50 p-2 h-full flex flex-col items-start justify-between"
    >
      <aside className="w-full">
        <Link href="/store/dashboard">
          <Button variant="link" className="text-black text-base">
            <Store className="w-5 h-5" />
            Store Dashboard
          </Button>
        </Link>
        <Separator />
        <Link href="/store/products">
          <Button variant="link" className="text-black text-base">
            <ShoppingBasket className="w-5 h-5" />
            Manage Products
          </Button>
        </Link>
      </aside>
      <Button
        variant="link"
        className="text-red-500 text-base"
        onClick={() => onLogout()}
      >
        <LogOut className="w-5 h-5" />
        Logout
      </Button>
    </div>
  );
}
