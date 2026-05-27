import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { betSocialApi } from "@/services/api/betsocial-api";
import { defaultQueryOptions, pollIntervals } from "@/hooks/query-config";

export function useChallenges(enabled = true) {
  return useQuery({
    queryKey: queryKeys.challenges,
    queryFn: betSocialApi.challenges,
    enabled,
    refetchInterval: enabled ? pollIntervals.challenges : false,
    ...defaultQueryOptions
  });
}
