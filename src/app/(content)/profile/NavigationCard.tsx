"use client";

import { LogOut, User, Store, Package } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { logoutFn } from "@/http/authentication";

export default function NavigationCard() {
  const { mutate: onLogout } = useMutation({
    mutationFn: logoutFn,
    onSuccess: () => {
      window.localStorage.removeItem("userData");
      window.location.href = "/authentication/login";
    },
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-border/50 p-2">
      <Button variant="link" className="text-black text-base">
        <User className="w-5 h-5" />
        Dashbaord
      </Button>
      <Separator />
      <Button variant="link" className="text-black text-base">
        <Store className="w-5 h-5" />
        Store
      </Button>
      <Separator />
      <Button variant="link" className="text-black text-base">
        <Package className="w-5 h-5" />
        Driver
      </Button>
      <Separator />
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
