import { useQuery } from "@tanstack/react-query";
import { defaultQueryOptions } from "@/hooks/query-config";
import { queryKeys } from "@/lib/query-keys";
import { betSocialApi } from "@/services/api/betsocial-api";

export function useDiscovery(enabled = true) {
  return useQuery({
    queryKey: queryKeys.discovery,
    queryFn: betSocialApi.discovery,
    enabled,
    ...defaultQueryOptions
  });
}
