"use client";

import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/stores/ui-store";
import type { FeedFilter } from "@/types/betsocial";

const tabs: { id: FeedFilter; label: string }[] = [
  { id: "forYou", label: "Para você" },
  { id: "following", label: "Seguindo" }
];

export function FeedFilterTabs() {
  const feedFilter = useUiStore((s) => s.feedFilter);
  const setFeedFilter = useUiStore((s) => s.setFeedFilter);
  const queryClient = useQueryClient();

  function select(filter: FeedFilter) {
    setFeedFilter(filter);
    void queryClient.invalidateQueries({ queryKey: queryKeys.feed(filter) });
  }

  return (
    <div className="flex rounded-full border border-white/10 bg-white/[0.035] p-1 text-xs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => select(tab.id)}
          className={cn(
            "rounded-full px-4 py-1.5 font-bold transition",
            feedFilter === tab.id ? "bg-primary/15 text-primary shadow-neon" : "text-zinc-400 hover:text-white"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
