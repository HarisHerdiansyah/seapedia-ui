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
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  imageUrl: string;
  location: string;
  updatedAt: string;
};

export type ProductPayload = {
  categoryId: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
};

export type ProductDetailData = {
  id: string;
  name: string;
  categoryId: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  rating: number;
  imageUrl: string;
  location: string;
  storeId: string;
  storeName: string;
};

export type StoreRegisterPayload = {
  userId: string;
  storeName: string;
  location: string;
};

export type LocationData = {
  code: string;
  name: string;
};

export type StoreProductData = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  updatedAt: string;
};

export type StoreProductDetailData = {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
};

export type StoreProfileData = {
  id: string;
  storeName: string;
  ownerEmail: string;
  location: string;
};
