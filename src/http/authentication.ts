import { apiClient } from "./interceptor";
import { LoginPayload, RegisterPayload } from "./types";

const endpoint = {
  register: "/authentication/register",
  login: "/authentication/login",
};

export async function registerFn(payload: RegisterPayload) {
  const response = await apiClient.post(endpoint.register, payload);
  return response.data;
}

export async function loginFn(payload: LoginPayload) {
  const response = await apiClient.post(endpoint.login, payload);
  return response.data;
}
