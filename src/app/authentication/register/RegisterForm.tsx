"use client";

import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useImmer } from "use-immer";
import { ChangeEvent, FormEvent } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { registerFn } from "@/http/authentication";
import { RegisterPayload, ApiResponse } from "@/http/types";

type RegisterState = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterForm() {
  const [registerData, setRegisterData] = useImmer<RegisterState>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { mutate, isPending } = useMutation<
    any,
    AxiosError<ApiResponse>,
    RegisterPayload
  >({
    mutationFn: registerFn,
    onSuccess: (data) => {
      toast.success(data.message, { position: "top-right" });
    },
    onError: (err) => {
      if (err.response) {
        const data = err.response.data;
        toast.success(data.message, { position: "top-right" });
      }
    },
  });

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterData((draft) => {
      const name = e.target.name as keyof RegisterState;
      draft[name] = e.target.value;
    });
  };

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = registerData;
    const differentLength = password.length !== confirmPassword.length;
    const differentValue = password !== confirmPassword;
    if (differentLength || differentValue) {
      toast.error("Confirm password is different with actual password", {
        position: "top-right",
      });
      return;
    }

    const payload: RegisterPayload = {
      username,
      email,
      password,
      role: "NON_ADMIN",
    };
    mutate(payload);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <FieldSet>
        <FieldLegend>Registration Form</FieldLegend>
        <div className="grid grid-cols-2 gap-4">
          <Field className="gap-1">
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              id="username"
              name="username"
              type="text"
              onChange={onInputChange}
              value={registerData.username}
            />
            <FieldDescription>Must contain 8-50 characters</FieldDescription>
            {/*<FieldError>Field Error</FieldError>*/}
          </Field>
          <Field className="gap-1">
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              onChange={onInputChange}
              value={registerData.email}
            />
            <FieldDescription>Must be a valid email address</FieldDescription>
            {/*<FieldError>Field Error</FieldError>*/}
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field className="gap-1">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              onChange={onInputChange}
              value={registerData.password}
            />
            <FieldDescription>
              Must contain 8-16 characters, combining uppercase, number, and
              special character
            </FieldDescription>
            {/*<FieldError>Field Error</FieldError>*/}
          </Field>
          <Field className="gap-1">
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={onInputChange}
              value={registerData.confirmPassword}
            />
            <FieldDescription>Must match the password</FieldDescription>
            {/*<FieldError>Field Error</FieldError>*/}
          </Field>
        </div>
        <Field>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Processing ...." : "Register"}
          </Button>
        </Field>
      </FieldSet>
    </form>
  );
}
