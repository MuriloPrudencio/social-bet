"use client";

import { motion } from "framer-motion";
import { Share2, MoreHorizontal, Users } from "lucide-react";
import { Avatar } from "@/components/atoms/avatar";
import { Button } from "@/components/atoms/button";
import { Surface } from "@/components/atoms/surface";
import { FollowButton } from "@/components/molecules/follow-button";
import { ReactionBar } from "@/components/molecules/reaction-bar";
import { compact, money, relativeTime } from "@/lib/utils";
import { maskAmount, maskMultiplier } from "@/lib/templates";
import type { FeedPost, PrivacySettings, ReactionKey } from "@/types/betsocial";

const sourceLabels: Record<FeedPost["source"], string> = {
  following: "Seguindo",
  trending: "Em alta",
  ranking: "Ranking",
  badge: "Badge",
  event: "Evento"
};

type FeedPostCardProps = {
  post: FeedPost;
  privacy?: PrivacySettings;
  sharedPostId?: string;
  onReact: (postId: string, reaction: ReactionKey) => void;
  onShare: (post: FeedPost) => void;
};

export function FeedPostCard({ post, privacy, sharedPostId, onReact, onShare }: FeedPostCardProps) {
  const masked = post.privacyMasked;
  const showFollow = post.user.id !== "u1" && !post.isFollowingAuthor;

  return (
    <motion.article layout initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Surface className="premium-card p-4 transition hover:border-primary/30 hover:shadow-neon">
        <div className="mb-4 flex items-start gap-3">
          <Avatar label={post.user.avatar} verified={post.user.verified} size="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-bold">{post.user.name}</h3>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary">{post.user.badge}</span>
              <span className="rounded-full border border-violetGlow/30 bg-violetGlow/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violetGlow">
                {sourceLabels[post.source]}
              </span>
            </div>
            <p className="text-sm text-zinc-400">
              {relativeTime(post.createdAt)} · {post.metaLabel}
            </p>
            {post.user.followers != null ? (
              <p className="mt-1 inline-flex items-center gap-1 text-xs text-zinc-500">
                <Users className="size-3" />
                {compact(post.user.followers)} seguidores
              </p>
            ) : null}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {showFollow ? <FollowButton userId={post.user.id} isFollowing={post.user.isFollowing} compact /> : null}
            <MoreHorizontal className="size-5 text-zinc-500" />
          </div>
        </div>

        <div className="mb-3 rounded-xl border border-gold/15 bg-gradient-to-r from-primary/5 via-transparent to-violetGlow/10 p-3">
          <p className="text-lg font-black tracking-tight">{post.title}</p>
          <p className="text-sm text-zinc-300">{post.description}</p>
          {post.caption ? <p className="mt-2 text-sm font-medium text-primary/90">{post.sticker} {post.caption}</p> : null}
        </div>

        <div className="mb-4 grid overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] sm:grid-cols-[1fr_auto]">
          <div className="min-w-0 p-4">
            <p className="text-sm text-zinc-300">{post.game}</p>
            <p className="text-xs text-zinc-500">{post.metaLabel}</p>
          </div>
          <div className="flex min-w-0 items-center justify-between gap-3 border-t border-white/10 p-4 sm:min-w-48 sm:border-l sm:border-t-0">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase text-primary">Conquista</p>
              <p className="break-words text-xl font-black text-primary sm:text-2xl">
                {masked ? maskAmount(post.amount, privacy) : money(post.amount)}
              </p>
            </div>
            {post.multiplier > 0 ? (
              <span className="shrink-0 rounded-lg border border-violetGlow/40 bg-violetGlow/20 px-3 py-2 text-xl font-black text-white shadow-violet sm:text-2xl">
                {masked ? maskMultiplier(post.multiplier, privacy) : `${post.multiplier}x`}
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <ReactionBar reactions={post.reactions} onReact={(reaction) => onReact(post.id, reaction)} />
          <div className="flex items-center gap-3 text-xs text-zinc-400">
            <span className="font-semibold text-zinc-500">{post.reactionCount ?? 0} reações</span>
            <Button variant="ghost" size="sm" onClick={() => onShare(post)}>
              <Share2 className="size-4" />
              {sharedPostId === post.id ? "Copiado" : "Compartilhar"}
            </Button>
          </div>
        </div>
      </Surface>
    </motion.article>
  );
}
