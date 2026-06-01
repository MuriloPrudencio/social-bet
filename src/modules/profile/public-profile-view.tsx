"use client";

import { ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Avatar } from "@/components/atoms/avatar";
import { Button } from "@/components/atoms/button";
import { Surface } from "@/components/atoms/surface";
import { FollowButton } from "@/components/molecules/follow-button";
import { SkeletonCard } from "@/components/molecules/skeleton-card";
import { FeedPostCard } from "@/components/organisms/feed/feed-post-card";
import { useFeedMutations } from "@/hooks/use-feed-mutations";
import { usePublicProfile } from "@/hooks/use-public-profile";
import { compact, money } from "@/lib/utils";
import { useFeedInteractionStore } from "@/stores/feed-interaction-store";
import type { FeedPost } from "@/types/betsocial";

export function PublicProfileView({ userId }: { userId: string }) {
  const profile = usePublicProfile(userId, Boolean(userId));
  const { reactToPost } = useFeedMutations();
  const openStory = useFeedInteractionStore((s) => s.openStory);
  const sharedPostId = useFeedInteractionStore((s) => s.sharedPostId);
  const setSharedPostId = useFeedInteractionStore((s) => s.setSharedPostId);

  async function sharePost(post: FeedPost) {
    const text = `${post.user.name}: ${post.title}`;
    if (navigator.share) await navigator.share({ title: post.title, text, url: window.location.href });
    else await navigator.clipboard.writeText(`${text} ${window.location.href}`);
    setSharedPostId(post.id);
    window.setTimeout(() => setSharedPostId(undefined), 1800);
  }

  if (profile.isLoading) {
    return (
      <div className="space-y-4">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (!profile.data) {
    return (
      <Surface className="p-6 text-center">
        <p className="font-bold">Perfil nao encontrado.</p>
        <Button asChild className="mt-4">
          <Link href="/feed">Voltar ao feed</Link>
        </Button>
      </Surface>
    );
  }

  const { profile: user, posts, stories, isCurrentUser } = profile.data;

  return (
    <div className="space-y-4">
      <Link href="/feed" className="inline-flex items-center gap-2 px-1 text-sm font-bold text-zinc-300 transition hover:text-primary">
        <ArrowLeft className="size-4" />
        Feed
      </Link>

      <Surface className="overflow-hidden rounded-2xl">
        <div className="h-28 bg-[radial-gradient(circle_at_20%_20%,rgba(50,242,83,.4),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(168,85,247,.45),transparent_32%),linear-gradient(135deg,rgba(255,200,61,.18),rgba(4,10,16,.94))]" />
        <div className="p-5">
          <div className="-mt-14 flex items-end gap-4">
            <Avatar label={user.avatar} verified={user.verified} size="lg" className="rounded-full bg-[#071018] p-1" />
            <div className="min-w-0 flex-1 pb-1">
              <h1 className="truncate text-2xl font-black">{user.name}</h1>
              <p className="truncate text-sm text-zinc-400">{user.handle}</p>
            </div>
            {isCurrentUser ? (
              <Button asChild variant="glass" size="sm">
                <Link href="/profile">Editar</Link>
              </Button>
            ) : (
              <FollowButton userId={user.id} isFollowing={user.isFollowing} source="profile" />
            )}
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            <Metric label="Publicacoes" value={compact(user.posts)} />
            <Metric label="Seguidores" value={compact(user.followers)} />
            <Metric label="Seguindo" value={compact(user.following)} />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Stat label="Total ganho" value={money(user.totalWon)} />
            <Stat label="Melhor multi" value={`${user.bestMultiplier}x`} />
            <Stat label="Jogo favorito" value={user.favoriteGame} />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {user.badges.map((badge) => (
              <span key={badge} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1 text-xs font-bold text-zinc-200">
                <ShieldCheck className="size-3.5 text-primary" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </Surface>

      {stories.length ? (
        <Surface className="p-4">
          <h2 className="mb-3 text-lg font-black">Stories</h2>
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-1">
            {stories.map((story) => (
              <button key={story.id} type="button" onClick={() => openStory(story)} className="w-[4.75rem] shrink-0 text-center">
                <div className="story-ring mx-auto rounded-full bg-[conic-gradient(#32f253,#a855f7,#ffc83d,#32f253)] p-[3px]">
                  <div className="rounded-full bg-[#071018] p-[2px]">
                    <Avatar label={story.user.avatar} verified={story.user.verified} size="lg" />
                  </div>
                </div>
                <p className="mt-1.5 truncate text-xs font-semibold text-zinc-100">{story.templateLabel}</p>
              </button>
            ))}
          </div>
        </Surface>
      ) : null}

      <section className="space-y-4">
        <div className="px-1">
          <h2 className="text-lg font-black">Atividade</h2>
          <p className="text-xs text-zinc-500">Posts, conquistas e reacoes do usuario.</p>
        </div>
        {posts.length ? (
          posts.map((post) => (
            <FeedPostCard
              key={post.id}
              post={post}
              privacy={user.privacy}
              sharedPostId={sharedPostId}
              onReact={(postId, reaction) => reactToPost.mutate({ postId, reaction })}
              onShare={(item) => void sharePost(item)}
            />
          ))
        ) : (
          <Surface className="p-6 text-center text-sm text-zinc-400">Esse usuario ainda nao publicou conquistas.</Surface>
        )}
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-lg font-black">{value}</p>
      <p className="text-xs text-zinc-400">{label}</p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.035] p-3">
      <p className="text-xs text-zinc-400">{label}</p>
      <p className="mt-1 break-words font-black">{value}</p>
    </div>
  );
}
