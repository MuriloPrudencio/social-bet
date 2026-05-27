import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { betSocialApi } from "@/services/api/betsocial-api";
import { defaultQueryOptions, pollIntervals } from "@/hooks/query-config";

export function useRanking(enabled = true) {
  return useQuery({
    queryKey: queryKeys.ranking,
    queryFn: betSocialApi.ranking,
    enabled,
    refetchInterval: enabled ? pollIntervals.ranking : false,
    ...defaultQueryOptions
  });
}
