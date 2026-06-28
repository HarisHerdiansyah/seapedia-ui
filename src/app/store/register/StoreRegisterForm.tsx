"use client";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useImmer } from "use-immer";
import { ChangeEvent, FormEvent } from "react";
import { AxiosError } from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getProvincesFn, getRegenciesFn } from "@/http/location";
import { ApiResponse, LocationData, StoreRegisterPayload } from "@/http/types";
import { useAuth } from "@/hooks/useAuth";
import { registerStoreFn } from "@/http/store";
import { useRouter } from "next/navigation";

type StoreRegisterState = {
  storeName: string;
  province: string;
  provinceCode: string;
  regency: string;
};

export default function StoreRegisterForm() {
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();

  const [formData, setFormData] = useImmer<StoreRegisterState>({
    storeName: "",
    province: "",
    provinceCode: "",
    regency: "",
  });

  const { data: provinces } = useQuery({
    queryKey: ["provinces"],
    queryFn: getProvincesFn,
    select: (data) => data.data,
  });

  const { data: regencies, isFetching: fetchingCities } = useQuery({
    queryKey: ["regencies", formData.provinceCode],
    queryFn: () => getRegenciesFn(formData.provinceCode),
    select: (data) => data.data,
    enabled: !!formData.provinceCode,
  });

  const { mutate } = useMutation<
    any,
    AxiosError<ApiResponse>,
    StoreRegisterPayload
  >({
    mutationFn: registerStoreFn,
    onSuccess: () => {
      router.push("/store/dashboard");
    },
  });

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((draft) => {
      const name = e.target.name as keyof StoreRegisterState;
      draft[name] = e.target.value;
    });
  };

  const onProvinceChange = (value: string) => {
    const [code, name] = value.split("_");
    setFormData((draft) => {
      draft.province = name;
      draft.provinceCode = code;
      draft.regency = "";
    });
  };

  const onRegencyChange = (value: string) => {
    setFormData((draft) => {
      draft.regency = value;
    });
  };

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoggedIn && user?.id) {
      const payload = {
        userId: user.id,
        storeName: formData.storeName,
        location: `${formData.regency}, ${formData.province}`,
      };
      mutate(payload);
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <FieldSet>
        <FieldLegend className="text-center">
          Time to Sell your Products
        </FieldLegend>
        <FieldGroup>
          <Field className="gap-1">
            <FieldLabel htmlFor="storeName">Store Name</FieldLabel>
            <Input
              id="storeName"
              name="storeName"
              type="text"
              onChange={onInputChange}
              value={formData.storeName}
            />
            <FieldDescription>
              Store name at least have 10 characters and max 50 characters.
            </FieldDescription>
          </Field>
          <Field className="gap-1">
            <FieldLabel>Province:</FieldLabel>
            <Select onValueChange={onProvinceChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select province" />
              </SelectTrigger>
              <SelectContent>
                {provinces?.map((cat: LocationData) => (
                  <SelectItem key={cat.code} value={`${cat.code}_${cat.name}`}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldDescription>
              Choose province where your store is located.
            </FieldDescription>
          </Field>
          <Field className="gap-1">
            <FieldLabel>Regency:</FieldLabel>
            <Select
              onValueChange={onRegencyChange}
              disabled={!formData.provinceCode || fetchingCities}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={fetchingCities ? "Loading..." : "Select regency"}
                />
              </SelectTrigger>
              <SelectContent>
                {!fetchingCities &&
                  regencies?.map((cat: LocationData) => (
                    <SelectItem key={cat.code} value={cat.name}>
                      {cat.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <FieldDescription>
              Choose regency where your store is located.
            </FieldDescription>
          </Field>
        </FieldGroup>
        <Field>
          <Button type="submit">Register</Button>
        </Field>
      </FieldSet>
    </form>
  );
}
