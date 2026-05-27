"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { env } from "@/config/env";
import { defaultQueryOptions } from "@/hooks/query-config";
import { loginDemo } from "@/services/auth/auth-api";

function createQueryClient() {
  return new QueryClient({
    defaultOptions: { queries: defaultQueryOptions }
  });
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(!env.apiMock);
  const [queryClient] = useState(createQueryClient);

  useEffect(() => {
    async function bootstrap() {
      if (env.apiMock) {
        const { worker } = await import("@/services/mocks/browser");
        await worker.start({ onUnhandledRequest: "bypass" });
        setReady(true);
        return;
      }
      try {
        await loginDemo();
      } catch {
        console.error("Não foi possível autenticar na API. Verifique se o back-end está rodando.");
      }
      setReady(true);
    }
    void bootstrap();
  }, []);

  if (!ready) {
    return (
      <div className="grid min-h-screen place-items-center bg-betsocial-radial text-primary">
        <div className="text-center">
          <p className="text-lg font-black">BetSocial</p>
          <p className="mt-2 text-sm text-zinc-400">Inicializando camada social...</p>
        </div>
      </div>
    );
  }

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
