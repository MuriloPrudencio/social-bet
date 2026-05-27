import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { betSocialApi } from "@/services/api/betsocial-api";
import type { PrivacySettings } from "@/types/betsocial";
import { defaultQueryOptions } from "@/hooks/query-config";

export function usePrivacy(enabled = true) {
  return useQuery({
    queryKey: queryKeys.privacy,
    queryFn: betSocialApi.privacy,
    enabled,
    ...defaultQueryOptions
  });
}

export function usePrivacyMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<PrivacySettings>) => betSocialApi.updatePrivacy(body),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.privacy });
      void queryClient.invalidateQueries({ queryKey: queryKeys.profile });
      void queryClient.invalidateQueries({ queryKey: queryKeys.feed("forYou") });
      void queryClient.invalidateQueries({ queryKey: queryKeys.feed("following") });
      void queryClient.invalidateQueries({ queryKey: queryKeys.ranking });
    }
  });
}
