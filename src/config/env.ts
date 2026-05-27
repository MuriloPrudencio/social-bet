export const env = {
  apiMock: process.env.NEXT_PUBLIC_API_MOCK !== "false",
  apiUrl: process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? ""
} as const;
