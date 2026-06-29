import { apiClient } from "./interceptor";
import { StoreRegisterPayload, ProductParams } from "./types";

export async function registerStoreFn(payload: StoreRegisterPayload) {
  const response = await apiClient.post("/stores", payload);
  return response.data;
}

export async function getMyStore() {
  const response = await apiClient.get("/stores/me");
  return response.data;
}

export async function getStoreProductsFn(params: ProductParams) {
  const response = await apiClient.get("/stores/products", { params });
  return response.data;
}

export async function getStoreProductDetailFn(id: string) {
  const response = await apiClient.get(`/stores/products/${id}`);
  return response.data;
}

export async function getStoreProfileFn(id: string) {
  const response = await apiClient.get(`/stores/${id}/profile`);
  return response.data;
}

export async function getStoreCategoriesFn(id: string) {
  const response = await apiClient.get(`/stores/${id}/categories`);
  return response.data;
}

export async function getStoreCatalogFn(id: string, params: ProductParams) {
  const response = await apiClient.get(`/stores/${id}/catalog`, { params });
  return response.data;
}
