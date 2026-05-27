"use client";

import { StoriesRail } from "@/components/organisms/feed/stories-rail";
import { FeedList } from "@/components/organisms/feed/feed-list";
import { useFeed } from "@/hooks/use-feed";
import { useStories } from "@/hooks/use-stories";
import { useProfile } from "@/hooks/use-profile";
import { useFeedMutations } from "@/hooks/use-feed-mutations";

export function FeedView() {
  const feed = useFeed(true);
  const stories = useStories(true);
  const profile = useProfile(true);
  const { reactToPost } = useFeedMutations();

  return (
    <>
      <StoriesRail stories={stories.data} currentUserId={profile.data?.id} />
      <FeedList
        posts={feed.data}
        loading={feed.isLoading}
        privacy={profile.data?.privacy}
        onReact={(postId, reaction) => reactToPost.mutate({ postId, reaction })}
      />
    </>
  );
}
