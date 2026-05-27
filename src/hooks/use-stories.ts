import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { betSocialApi } from "@/services/api/betsocial-api";
import { defaultQueryOptions, pollIntervals } from "@/hooks/query-config";

export function useStories(enabled = true) {
  return useQuery({
    queryKey: queryKeys.stories,
    queryFn: betSocialApi.stories,
    enabled,
    refetchInterval: enabled ? pollIntervals.stories : false,
    ...defaultQueryOptions
  });
}
