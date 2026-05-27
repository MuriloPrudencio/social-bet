import { create } from "zustand";
import type { CreatePostPayload, PendingWinShare, Story } from "@/types/betsocial";

type FeedInteractionState = {
  story?: Story;
  winSharePayload?: PendingWinShare;
  winShareOpen: boolean;
  storyComposerOpen: boolean;
  postComposerOpen: boolean;
  postComposerInitial?: CreatePostPayload;
  ignoredWinShareIds: string[];
  sharedPostId?: string;
  openStory: (story: Story) => void;
  setSharedPostId: (sharedPostId?: string) => void;
  closeStory: () => void;
  openStoryComposer: () => void;
  closeStoryComposer: () => void;
  openPostComposer: (initial?: CreatePostPayload) => void;
  closePostComposer: () => void;
  openWinShare: (payload: PendingWinShare) => void;
  closeWinShare: () => void;
};

export const useFeedInteractionStore = create<FeedInteractionState>((set) => ({
  winShareOpen: false,
  storyComposerOpen: false,
  postComposerOpen: false,
  ignoredWinShareIds: [],
  openStory: (story) => set({ story }),
  closeStory: () => set({ story: undefined }),
  openStoryComposer: () => set({ storyComposerOpen: true }),
  closeStoryComposer: () => set({ storyComposerOpen: false }),
  openPostComposer: (postComposerInitial) => set({ postComposerOpen: true, postComposerInitial }),
  closePostComposer: () => set({ postComposerOpen: false, postComposerInitial: undefined }),
  setSharedPostId: (sharedPostId) => set({ sharedPostId }),
  openWinShare: (winSharePayload) => set({ winSharePayload, winShareOpen: true }),
  closeWinShare: () =>
    set((state) => ({
      ignoredWinShareIds: state.winSharePayload?.id
        ? Array.from(new Set([...state.ignoredWinShareIds, state.winSharePayload.id]))
        : state.ignoredWinShareIds,
      winSharePayload: undefined,
      winShareOpen: false
    }))
}));
