export type ApiResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  data: unknown;
  timestamp: string;
};

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
  role: "ADMIN" | "NON_ADMIN";
};

export type LoginPayload = Pick<RegisterPayload, "email" | "password">;

export type SelectRolePayload = {
  activeRole: string;
};

export type AppReviewPayload = {
  reviewer: string;
  rating: number;
  content: string;
};

export type CategoryData = {
  id: string;
  name: string;
};

export type AppReviewData = {
  id: string;
  reviewer: string;
  rating: number;
  content: string;
};

export type OrderProductType = "NEWEST" | "OLDEST" | "PRICE_ASC" | "PRICE_DESC";

export type ProductParams = {
  page: number;
  size: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  order?: OrderProductType;
};

export type ProductData = {
  id: string | number;
  name: string;
  price: number;
  imageUrl: string;
  location: string;
  updatedAt: string;
};
