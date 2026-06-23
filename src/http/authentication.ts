import { apiClient } from "./interceptor";
import { RegisterPayload } from "./types";

const endpoint = {
  register: "/authentication/register",
};

export async function registerFn(payload: RegisterPayload) {
  const response = await apiClient.post(endpoint.register, payload);
  return response.data;
}
