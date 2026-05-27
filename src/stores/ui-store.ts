import { create } from "zustand";
import type { FeedFilter } from "@/types/betsocial";

export type BetSocialView = "feed" | "explore" | "ranking" | "challenges" | "achievements" | "notifications" | "profile" | "reactions";

type UiState = {
  activeView: BetSocialView;
  feedFilter: FeedFilter;
  setActiveView: (view: BetSocialView) => void;
  setFeedFilter: (filter: FeedFilter) => void;
};

export const useUiStore = create<UiState>((set) => ({
  activeView: "feed",
  feedFilter: "forYou",
  setActiveView: (activeView) => set({ activeView }),
  setFeedFilter: (feedFilter) => set({ feedFilter })
}));
