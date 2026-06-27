import { apiClient } from "./interceptor";
import { AppReviewPayload } from "./types";

export async function getAppReviewsFn() {
  const response = await apiClient.get("/app-review");
  return response.data;
}

export async function submitAppReviewFn(payload: AppReviewPayload) {
  const response = await apiClient.post("/app-review", payload);
  return response.data;
}
