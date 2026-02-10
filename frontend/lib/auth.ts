import { apiFetch } from "./api";

export const login = (email: string, password: string) =>
  apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const register = (email: string, password: string, fullName: string) =>
  apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, fullName }),
  });

export const logout = () => apiFetch("/auth/logout", { method: "POST" });
