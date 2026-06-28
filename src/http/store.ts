import { apiClient } from "./interceptor";
import { StoreRegisterPayload } from "./types";

export async function registerStoreFn(payload: StoreRegisterPayload) {
  const response = await apiClient.post("/stores", payload);
  return response.data;
}

export async function getMyStore() {
  const response = await apiClient.get("/stores/me");
  return response.data;
}
