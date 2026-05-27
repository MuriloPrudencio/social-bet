import { env } from "@/config/env";

export type AuthResponse = {
  accessToken: string;
  expiresIn: string;
  userId: string;
};

const TOKEN_KEY = "betsocial_token";

export function getStoredToken() {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string) {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export async function loginDemo(): Promise<AuthResponse> {
  const base = env.apiUrl.replace(/\/$/, "");
  const response = await fetch(`${base}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: process.env.NEXT_PUBLIC_DEMO_EMAIL ?? "murilo@betsocial.app",
      password: process.env.NEXT_PUBLIC_DEMO_PASSWORD ?? "BetSocial2026!"
    })
  });

  if (!response.ok) {
    throw new Error("Falha ao autenticar na API");
  }

  const data = (await response.json()) as AuthResponse;
  setStoredToken(data.accessToken);
  return data;
}
