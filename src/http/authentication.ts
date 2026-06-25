import { apiClient } from "./interceptor";
import { LoginPayload, RegisterPayload, SelectRolePayload } from "./types";

const endpoint = {
  register: "/authentication/register",
  login: "/authentication/login",
  selectRole: "/authentication/select-active-role",
  logout: "/authentication/logout",
};

export async function registerFn(payload: RegisterPayload) {
  const response = await apiClient.post(endpoint.register, payload);
  return response.data;
}

export async function loginFn(payload: LoginPayload) {
  const response = await apiClient.post(endpoint.login, payload);
  return response.data;
}

export async function selectRoleFn(payload: SelectRolePayload) {
  const response = await apiClient.post(endpoint.selectRole, payload);
  return response.data;
}

export async function logoutFn() {
  const response = await apiClient.post(endpoint.logout, {});
  return response.data;
}
