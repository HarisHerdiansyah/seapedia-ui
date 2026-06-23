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
