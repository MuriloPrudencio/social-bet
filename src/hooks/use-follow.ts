import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { betSocialApi } from "@/services/api/betsocial-api";
import { defaultQueryOptions } from "@/hooks/query-config";
import type { FollowSource } from "@/types/betsocial";

export function useFollowing(enabled = true) {
  return useQuery({
    queryKey: queryKeys.following,
    queryFn: betSocialApi.following,
    enabled,
    ...defaultQueryOptions
  });
}

export function useFollow(userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: boolean | { isFollowing: boolean; source?: FollowSource }) => {
      const isFollowing = typeof input === "boolean" ? input : input.isFollowing;
      const source = typeof input === "boolean" ? "suggestion" : input.source;
      return isFollowing ? betSocialApi.unfollow(userId) : betSocialApi.follow(userId, source);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.follow(userId) });
      void queryClient.invalidateQueries({ queryKey: queryKeys.following });
      void queryClient.invalidateQueries({ queryKey: queryKeys.feed("forYou") });
      void queryClient.invalidateQueries({ queryKey: queryKeys.feed("following") });
      void queryClient.invalidateQueries({ queryKey: queryKeys.profile });
      void queryClient.invalidateQueries({ queryKey: queryKeys.stories });
    }
  });
}
