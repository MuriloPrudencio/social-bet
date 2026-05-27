"use client";

import { AnimatePresence } from "framer-motion";
import { FeedFilterTabs } from "@/components/molecules/feed-filter-tabs";
import { SkeletonCard } from "@/components/molecules/skeleton-card";
import { FeedPostCard } from "@/components/organisms/feed/feed-post-card";
import { useFeedInteractionStore } from "@/stores/feed-interaction-store";
import type { FeedPost, PrivacySettings, ReactionKey } from "@/types/betsocial";

type FeedListProps = {
  posts?: FeedPost[];
  loading?: boolean;
  privacy?: PrivacySettings;
  onReact: (postId: string, reaction: ReactionKey) => void;
};

export function FeedList({ posts, loading, privacy, onReact }: FeedListProps) {
  const sharedPostId = useFeedInteractionStore((s) => s.sharedPostId);
  const setSharedPostId = useFeedInteractionStore((s) => s.setSharedPostId);

  if (loading) {
    return (
      <div className="space-y-4">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  async function sharePost(post: FeedPost) {
    const text = `${post.user.name}: ${post.title}`;
    if (navigator.share) await navigator.share({ title: post.title, text, url: window.location.href });
    else await navigator.clipboard.writeText(`${text} ${window.location.href}`);
    setSharedPostId(post.id);
    window.setTimeout(() => setSharedPostId(undefined), 1800);
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3 px-1">
        <div>
          <h2 className="text-lg font-black">Feed</h2>
          <p className="text-xs text-zinc-500">Prova social · comunidade viva</p>
        </div>
        <FeedFilterTabs />
      </div>
      <AnimatePresence initial={false}>
        {(posts ?? []).map((post) => (
          <FeedPostCard
            key={post.id}
            post={post}
            privacy={privacy}
            sharedPostId={sharedPostId}
            onReact={onReact}
            onShare={(p) => void sharePost(p)}
          />
        ))}
      </AnimatePresence>
      {(posts ?? []).length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center text-sm text-zinc-400">
          Siga jogadores e influencers para ver conquistas aqui.
        </p>
      ) : null}
    </section>
  );
}
