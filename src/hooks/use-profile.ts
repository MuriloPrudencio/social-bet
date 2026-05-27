import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { betSocialApi } from "@/services/api/betsocial-api";
import { defaultQueryOptions, pollIntervals } from "@/hooks/query-config";

export function useProfile(enabled = true) {
  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: betSocialApi.profile,
    enabled,
    refetchInterval: enabled ? pollIntervals.profile : false,
    ...defaultQueryOptions
  });
}

export function useActivities(enabled = true) {
  return useQuery({
    queryKey: queryKeys.activities,
    queryFn: betSocialApi.activities,
    enabled,
    refetchInterval: enabled ? pollIntervals.profile : false,
    ...defaultQueryOptions
  });
}
