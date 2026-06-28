"use client";

import { LogOut, UserRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getMyStore } from "@/http/store";
import { logoutFn } from "@/http/authentication";
import { useRouter } from "next/navigation";
import { selectRoleFn } from "@/http/authentication";
import { ApiResponse, SelectRolePayload } from "@/http/types";
import { AxiosError } from "axios";
import { toast } from "sonner";

export default function ProfilePage() {
  const router = useRouter();

  const { user, activeRole, setActiveRole, logout } = useAuth();

  const { data: storeData } = useQuery({
    queryKey: ["my-store"],
    queryFn: getMyStore,
    select: (data) => data.data,
  });

  const { mutate: onLogout } = useMutation({
    mutationFn: logoutFn,
    onSuccess: () => {
      logout();
      window.location.href = "/home";
    },
  });

  const { mutate } = useMutation<
    any,
    AxiosError<ApiResponse>,
    SelectRolePayload
  >({
    mutationFn: selectRoleFn,
    onSuccess: (data) => {
      const payload = data.data;
      const updatedUser = { ...user, role: payload.activeRole };
      setActiveRole(payload.activeRole, payload.accessToken, updatedUser);

      let redirectPath = "";
      if (payload.activeRole === "BUYER") redirectPath = "/profile";
      if (payload.activeRole === "SELLER") redirectPath = "/store/dashboard";
      router.push(redirectPath);
    },
    onError: (err) => {
      if (err.response) {
        toast.error(err.response.data.message, { position: "top-right" });
      }
    },
  });

  return (
    <div className="max-w-7xl space-y-4 mt-4 mb-8">
      <div className="bg-white rounded-2xl shadow-sm border border-border/50 p-6">
        <div className="flex justify-end mb-2">
          <Button variant="destructive" onClick={() => onLogout()}>
            <LogOut /> Logout
          </Button>
        </div>
        <div className="flex items-center gap-8">
          <aside className="rounded-full w-36 h-36 bg-primary-foreground flex items-center justify-center">
            <UserRound className="text-primary" size={72} />
          </aside>
          <article>
            <p className="text-2xl font-semibold">{user?.username}</p>
            <div className="my-2">
              <p>Active Role: {activeRole}</p>
            </div>
          </article>
        </div>
      </div>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-2xl font-semibold">
            Personal Information
          </CardTitle>
          <Button disabled={activeRole === "BUYER"}>Switch as Buyer</Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6 text-base">
            <div>
              <label className="font-semibold">Username</label>
              <p>{user?.username}</p>
            </div>
            <div>
              <label className="font-semibold">Email</label>
              <p>{user?.email}</p>
            </div>
            <div>
              <label className="font-semibold">Active Role</label>
              <p>{activeRole}</p>
            </div>
            <div>
              <label className="font-semibold">Allowed Roles</label>
              <p>{user?.allowedAs?.join(", ")}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-2xl font-semibold">
            Store Information
          </CardTitle>
          <Button
            disabled={
              !user?.allowedAs?.includes("SELLER") || activeRole === "SELLER"
            }
          >
            Switch as Seller
          </Button>
        </CardHeader>
        {user?.allowedAs?.includes("SELLER") ? (
          <CardContent>
            <div className="grid grid-cols-2 gap-6 text-base">
              <div>
                <label className="font-semibold">Store Name</label>
                <p>{storeData?.storeName}</p>
              </div>
              <div>
                <label className="font-semibold">Location</label>
                <p>{storeData?.location}</p>
              </div>
            </div>
          </CardContent>
        ) : (
          <CardContent className="flex flex-col gap-2 items-center justify-center">
            <p className="text-xl">You need to register first.</p>
            <Link href="/store/register">
              <Button>Register as Seller</Button>
            </Link>
          </CardContent>
        )}
      </Card>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-2xl font-semibold">
            Driver Information
          </CardTitle>
          <Button
            disabled={
              !user?.allowedAs?.includes("DRIVER") || activeRole === "DRIVER"
            }
          >
            Switch as Driver
          </Button>
        </CardHeader>
        {user?.allowedAs?.includes("DRIVER") ? (
          <CardContent>
            <div className="grid grid-cols-2 gap-6 text-base">
              <div>
                <label className="font-semibold">Driver Status</label>
                <p>Active</p>
              </div>
            </div>
          </CardContent>
        ) : (
          <CardContent className="flex flex-col gap-2 items-center justify-center">
            <p className="text-xl">You need to register first.</p>
            <Link href="">
              <Button>Register as Driver</Button>
            </Link>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
