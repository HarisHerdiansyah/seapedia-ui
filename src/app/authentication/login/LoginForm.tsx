"use client";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ApiResponse, LoginPayload } from "@/http/types";
import { useImmer } from "use-immer";
import { ChangeEvent, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { loginFn } from "@/http/authentication";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

type LoginState = LoginPayload;

export default function LoginForm() {
  const router = useRouter();
  const { setLoginData } = useAuth();
  const [loginData, setLocalLoginData] = useImmer<LoginState>({
    email: "",
    password: "",
  });
  const { mutate, isPending } = useMutation<
    any,
    AxiosError<ApiResponse>,
    LoginPayload
  >({
    mutationFn: loginFn,
    onSuccess: (data) => {
      const payload = data.data;
      toast.success(data.message, { position: "top-right" });
      setLoginData(payload.userData, payload.accessToken);
      router.push("/authentication/active-role");
    },
    onError: (err) => {
      if (err.response) {
        const data = err.response.data;
        toast.error(data.message, { position: "top-right" });
      }
    },
  });

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalLoginData((draft) => {
      const name = e.target.name as keyof LoginState;
      draft[name] = e.target.value;
    });
  };

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(loginData);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <FieldSet>
        <FieldLegend>Login Form</FieldLegend>
        <FieldGroup>
          <Field className="gap-1">
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              onChange={onInputChange}
              value={loginData.email}
            />
          </Field>
          <Field className="gap-1">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              onChange={onInputChange}
              value={loginData.password}
            />
          </Field>
        </FieldGroup>
        <Field>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Processing ...." : "Register"}
          </Button>
        </Field>
      </FieldSet>
    </form>
  );
}
