import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { betSocialApi } from "@/services/api/betsocial-api";
import { useFeedInteractionStore } from "@/stores/feed-interaction-store";
import { useEffect } from "react";
import { defaultQueryOptions, pollIntervals } from "@/hooks/query-config";

export function usePendingWinShare(enabled = true) {
  const openWinShare = useFeedInteractionStore((s) => s.openWinShare);
  const winShareOpen = useFeedInteractionStore((s) => s.winShareOpen);
  const ignoredWinShareIds = useFeedInteractionStore((s) => s.ignoredWinShareIds);

  const query = useQuery({
    queryKey: queryKeys.pendingWinShare,
    queryFn: betSocialApi.pendingWinShare,
    enabled: enabled && !winShareOpen,
    refetchInterval: enabled && !winShareOpen ? pollIntervals.pendingWin : false,
    ...defaultQueryOptions
  });

  useEffect(() => {
    if (query.data && !winShareOpen && !ignoredWinShareIds.includes(query.data.id)) openWinShare(query.data);
  }, [query.data, openWinShare, winShareOpen, ignoredWinShareIds]);

  return query;
}
