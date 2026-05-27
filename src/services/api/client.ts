import { env } from "@/config/env";
import { ApiError } from "@/services/api/errors";
import { getStoredToken } from "@/services/auth/auth-api";

function apiBase(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (env.apiUrl) return `${env.apiUrl}${normalized}`;
  return `/api${normalized}`;
}

type RequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: object;
  signal?: AbortSignal;
};

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, signal } = options;
  const token = getStoredToken();
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(apiBase(endpoint), {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
    signal
  });

  if (!response.ok) {
    let message = `Falha em ${endpoint}`;
    try {
      const payload = (await response.json()) as { message?: string; code?: string };
      if (payload.message) message = payload.message;
      throw new ApiError(message, response.status, payload.code);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(message, response.status);
    }
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export function apiGet<T>(endpoint: string, signal?: AbortSignal) {
  return request<T>(endpoint, { signal });
}

export function apiPost<TResponse, TBody extends object = Record<string, never>>(endpoint: string, body: TBody) {
  return request<TResponse>(endpoint, { method: "POST", body });
}

export function apiPatch<TResponse, TBody extends object>(endpoint: string, body: TBody) {
  return request<TResponse>(endpoint, { method: "PATCH", body });
}

export function apiDelete<T>(endpoint: string) {
  return request<T>(endpoint, { method: "DELETE" });
}
