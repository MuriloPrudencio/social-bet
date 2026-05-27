import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { betSocialApi } from "@/services/api/betsocial-api";
import { defaultQueryOptions, pollIntervals } from "@/hooks/query-config";

export function useNotifications(enabled = true) {
  return useQuery({
    queryKey: queryKeys.notifications,
    queryFn: betSocialApi.notifications,
    enabled,
    refetchInterval: enabled ? pollIntervals.notifications : false,
    ...defaultQueryOptions
  });
}

export function useNotificationActions() {
  const queryClient = useQueryClient();
  const sync = (data?: unknown) => {
    if (data) queryClient.setQueryData(queryKeys.notifications, data);
    void queryClient.invalidateQueries({ queryKey: queryKeys.notifications });
  };

  return {
    markRead: useMutation({
      mutationFn: (notificationId: string) => betSocialApi.markNotificationRead(notificationId),
      onSuccess: sync
    }),
    markAllRead: useMutation({
      mutationFn: () => betSocialApi.markAllNotificationsRead(),
      onSuccess: sync
    })
  };
}
