import { errorToast } from "@/lib/toast";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  let data: any = null;

  try {
    data = await res.json();
  } catch {
    errorToast(res?.statusText);
  }

  if (!res.ok) {
    const message =
      data?.error || data?.message || res.statusText || "Request failed";

    errorToast(message);
    throw new Error(message);
  }

  return data as T;
}
