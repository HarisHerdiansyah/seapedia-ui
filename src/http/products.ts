import { apiClient } from "./interceptor";
import { ProductParams } from "./types";

export async function getProductsFn(params: ProductParams) {
  const response = await apiClient.get("/products", { params });
  return response.data;
}
