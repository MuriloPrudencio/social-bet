import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { betSocialApi } from "@/services/api/betsocial-api";
import { defaultQueryOptions } from "@/hooks/query-config";

export function usePublicProfile(userId: string, enabled = true) {
  return useQuery({
    queryKey: queryKeys.publicProfile(userId),
    queryFn: () => betSocialApi.publicProfile(userId),
    enabled: enabled && Boolean(userId),
    ...defaultQueryOptions
  });
}
