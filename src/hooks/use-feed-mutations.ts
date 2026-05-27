import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { betSocialApi } from "@/services/api/betsocial-api";
import { useFeedInteractionStore } from "@/stores/feed-interaction-store";
import type { CreatePostPayload, CreateStoryPayload, ReactionKey } from "@/types/betsocial";

export function useFeedMutations() {
  const queryClient = useQueryClient();

  const reactToPost = useMutation({
    mutationFn: ({ postId, reaction }: { postId: string; reaction: ReactionKey }) => betSocialApi.reactToPost(postId, reaction),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["feed"] });
    }
  });

  const reactToStory = useMutation({
    mutationFn: ({ storyId, reaction }: { storyId: string; reaction: ReactionKey }) => betSocialApi.reactToStory(storyId, reaction),
    onSuccess: (updatedStory) => {
      useFeedInteractionStore.getState().openStory(updatedStory);
      void queryClient.invalidateQueries({ queryKey: queryKeys.stories });
    }
  });

  const createStory = useMutation({
    mutationFn: (body: CreateStoryPayload) => betSocialApi.createStory(body),
    onSuccess: (createdStory) => {
      useFeedInteractionStore.getState().closeStoryComposer();
      useFeedInteractionStore.getState().openStory(createdStory);
      void queryClient.invalidateQueries({ queryKey: queryKeys.stories });
    }
  });

  const deleteStory = useMutation({
    mutationFn: (storyId: string) => betSocialApi.deleteStory(storyId),
    onSuccess: () => {
      useFeedInteractionStore.getState().closeStory();
      void queryClient.invalidateQueries({ queryKey: queryKeys.stories });
    }
  });

  const createPost = useMutation({
    mutationFn: (body: CreatePostPayload) => betSocialApi.createPost(body),
    onSuccess: () => {
      useFeedInteractionStore.getState().closePostComposer();
      void queryClient.invalidateQueries({ queryKey: ["feed"] });
    }
  });

  const dismissWinShare = useMutation({
    mutationFn: () => betSocialApi.dismissWinShare(),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queryKeys.pendingWinShare });
      queryClient.setQueryData(queryKeys.pendingWinShare, null);
      useFeedInteractionStore.getState().closeWinShare();
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.pendingWinShare });
    },
    onError: () => {
      queryClient.setQueryData(queryKeys.pendingWinShare, null);
      useFeedInteractionStore.getState().closeWinShare();
    }
  });

  return { reactToPost, reactToStory, createStory, deleteStory, createPost, dismissWinShare };
}
