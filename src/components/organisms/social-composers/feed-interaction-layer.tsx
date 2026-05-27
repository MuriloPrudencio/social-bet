"use client";

import { TemplatePostComposer } from "@/components/organisms/social-composers/template-post-composer";
import { TemplateStoryComposer } from "@/components/organisms/social-composers/template-story-composer";
import { StoryViewer } from "@/components/organisms/social-composers/story-viewer";
import { WinShareModal } from "@/components/organisms/social-composers/win-share-modal";
import { useFeedMutations } from "@/hooks/use-feed-mutations";
import { useProfile } from "@/hooks/use-profile";
import { useFeedInteractionStore } from "@/stores/feed-interaction-store";
import type { CreatePostPayload, PendingWinShare } from "@/types/betsocial";

export function FeedInteractionLayer() {
  const story = useFeedInteractionStore((s) => s.story);
  const storyComposerOpen = useFeedInteractionStore((s) => s.storyComposerOpen);
  const postComposerOpen = useFeedInteractionStore((s) => s.postComposerOpen);
  const winShareOpen = useFeedInteractionStore((s) => s.winShareOpen);
  const winSharePayload = useFeedInteractionStore((s) => s.winSharePayload);
  const postComposerInitial = useFeedInteractionStore((s) => s.postComposerInitial);
  const closeStory = useFeedInteractionStore((s) => s.closeStory);
  const closeStoryComposer = useFeedInteractionStore((s) => s.closeStoryComposer);
  const closePostComposer = useFeedInteractionStore((s) => s.closePostComposer);

  const { reactToStory, createStory, deleteStory, createPost, dismissWinShare } = useFeedMutations();
  const profile = useProfile(true);

  return (
    <>
      <StoryViewer
        story={story}
        currentUserId={profile.data?.id}
        onClose={closeStory}
        onReact={(id, r) => reactToStory.mutate({ storyId: id, reaction: r })}
        onDelete={(id) => deleteStory.mutate(id)}
        onEdit={() => {
          closeStory();
          useFeedInteractionStore.getState().openStoryComposer();
        }}
      />
      <TemplateStoryComposer
        open={storyComposerOpen}
        pending={createStory.isPending}
        onClose={closeStoryComposer}
        onSubmit={(payload) => createStory.mutate(payload)}
      />
      <TemplatePostComposer
        open={postComposerOpen}
        pending={createPost.isPending}
        initial={postComposerInitial ?? (winSharePayload ? mapWinToPost(winSharePayload) : undefined)}
        onClose={closePostComposer}
        onSubmit={(payload) => createPost.mutate(payload)}
      />
      <WinShareModal
        open={winShareOpen}
        payload={winSharePayload}
        onDismiss={() => dismissWinShare.mutate()}
        onShare={(payload) => {
          createPost.mutate(mapWinToPost(payload));
          dismissWinShare.mutate();
        }}
      />
    </>
  );
}

function mapWinToPost(win: PendingWinShare): CreatePostPayload {
  return {
    templateType: win.templateType,
    game: win.game,
    amount: win.amount,
    multiplier: win.multiplier
  };
}
