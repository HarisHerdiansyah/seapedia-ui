import { apiClient } from "./interceptor";
import { ProductParams, ProductPayload } from "./types";

export async function getProductsFn(params: ProductParams) {
  const response = await apiClient.get("/products", { params });
  return response.data;
}

export async function getProductDetailFn(id: string) {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
}

export async function createProductFn(data: ProductPayload) {
  const response = await apiClient.post("/products", data);
  return response.data;
}

export async function updateProductFn(id: string, data: ProductPayload) {
  const response = await apiClient.put(`/products/${id}`, data);
  return response.data;
}

export async function deleteProductFn(id: string) {
  const response = await apiClient.delete(`/products/${id}`);
  return response.data;
}
