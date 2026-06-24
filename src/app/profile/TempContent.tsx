"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { logoutFn } from "@/http/authentication";

export default function TempContent() {
  const userData = JSON.parse(window.localStorage.getItem("userData") || "{}");
  const { mutate } = useMutation({
    mutationFn: logoutFn,
    onSuccess: () => {
      window.localStorage.removeItem("userData");
      window.location.href = "/authentication/login";
    },
  });

  return (
    <CardContent>
      <p>Current Role: {userData.role}</p>
      <p>Email: {userData.email}</p>
      <p>Username: {userData.username}</p>
      <Button onClick={() => mutate()}>Logout</Button>
    </CardContent>
  );
}
