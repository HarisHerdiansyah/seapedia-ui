import { apiClient } from "./interceptor";
import { AppReviewPayload } from "./types";

export async function submitAppReviewFn(payload: AppReviewPayload) {
  const response = await apiClient.post("/app-review", payload);
  return response.data;
}
