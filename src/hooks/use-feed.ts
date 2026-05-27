import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { betSocialApi } from "@/services/api/betsocial-api";
import { useUiStore } from "@/stores/ui-store";
import { defaultQueryOptions, pollIntervals } from "@/hooks/query-config";

export function useFeed(enabled = true) {
  const feedFilter = useUiStore((s) => s.feedFilter);
  return useQuery({
    queryKey: queryKeys.feed(feedFilter),
    queryFn: () => betSocialApi.feed(feedFilter),
    enabled,
    refetchInterval: enabled ? pollIntervals.feed : false,
    ...defaultQueryOptions
  });
}
