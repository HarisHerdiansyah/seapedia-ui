import { apiClient } from "./interceptor";

export async function getCategoriesFn() {
  const response = await apiClient.get("/categories");
  return response.data;
}
