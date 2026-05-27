"use client";

import { ReactionsPanel } from "@/components/organisms/reactions-panel";
import { useFeed } from "@/hooks/use-feed";
import { useFeedMutations } from "@/hooks/use-feed-mutations";

export function ReactionsView() {
  const feed = useFeed(true);
  const { reactToPost } = useFeedMutations();
  return (
    <ReactionsPanel
      posts={feed.data}
      onReact={(postId, reaction) => reactToPost.mutate({ postId, reaction })}
    />
  );
}
