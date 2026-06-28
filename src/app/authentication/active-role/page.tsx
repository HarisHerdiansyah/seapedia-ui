"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { selectRoleFn } from "@/http/authentication";
import { ApiResponse, SelectRolePayload } from "@/http/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useAuth } from "@/hooks/useAuth";

const activeRoleCard = [
  {
    role: "BUYER",
    label: "Buyer",
    image: "/buyer-role.svg",
  },
  {
    role: "SELLER",
    label: "Seller",
    image: "/seller-role.svg",
  },
  {
    role: "DRIVER",
    label: "Driver",
    image: "/driver-role.svg",
  },
];

export default function ActiveRolePage() {
  const { user, setActiveRole, isHydrated } = useAuth();

  const isIncludes = (role: string) => user?.allowedAs?.includes(role) ?? false;

  const router = useRouter();

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
      router.push("/profile/dashboard");
    },
    onError: (err) => {
      if (err.response) {
        toast.error(err.response.data.message, { position: "top-right" });
      }
    },
  });

  const onRoleSelected = (role: string) => {
    if (!isIncludes(role)) {
      alert("Implement soon");
      return;
    }
    mutate({ activeRole: role });
  };

  const onRegisterRole = (role: string) => {
    router.push("/store/register");
    // driver implemented soon
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="max-w-3xl w-full shrink-0">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Select Active Role
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {activeRoleCard.map((roleCard) => (
                <Card key={roleCard.role} className="cursor-pointer">
                  <CardContent className="relative h-32">
                    <Image
                      src={roleCard.image}
                      alt={roleCard.label}
                      className="object-contain"
                      fill
                    />
                  </CardContent>
                  <CardFooter className="justify-center">
                    {isIncludes(roleCard.role) ? (
                      <Button
                        onClick={() => onRoleSelected(roleCard.role)}
                        variant="default"
                        className="w-full"
                      >
                        Select as {roleCard.label}
                      </Button>
                    ) : (
                      <Button
                        onClick={() => onRegisterRole(roleCard.role)}
                        variant="secondary"
                        className="w-full"
                      >
                        Register as {roleCard.label}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
