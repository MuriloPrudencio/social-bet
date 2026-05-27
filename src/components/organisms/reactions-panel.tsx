import { Avatar } from "@/components/atoms/avatar";
import { Surface } from "@/components/atoms/surface";
import { ReactionBar } from "@/components/molecules/reaction-bar";
import { SectionHeading } from "@/components/molecules/section-heading";
import type { FeedPost, ReactionKey } from "@/types/betsocial";

const labels: Record<ReactionKey, string> = {
  fire: "Fogo",
  rocket: "Foguete",
  trophy: "Troféu",
  clap: "Aplausos",
  heart: "Valeu"
};

export function ReactionsPanel({
  posts = [],
  onReact
}: {
  posts?: FeedPost[];
  onReact?: (postId: string, reaction: ReactionKey) => void;
}) {
  const featured = posts[0];
  const totals = posts.reduce(
    (acc, post) => {
      Object.entries(post.reactions).forEach(([key, value]) => {
        acc[key as ReactionKey] += value;
      });
      return acc;
    },
    { fire: 0, rocket: 0, trophy: 0, clap: 0, heart: 0 } as Record<ReactionKey, number>
  );

  return (
    <Surface className="premium-card p-4">
      <SectionHeading title="Reações rápidas" subtitle="Sem comentários livres — apenas reações" />
      {featured ? (
        <div className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
          <div className="mb-3 flex items-center gap-3">
            <Avatar label={featured.user.avatar} verified={featured.user.verified} />
            <div>
              <p className="font-bold">{featured.user.name}</p>
              <p className="text-xs text-zinc-400">{featured.title}</p>
            </div>
          </div>
          <ReactionBar reactions={featured.reactions} onReact={onReact ? (r) => onReact(featured.id, r) : undefined} />
        </div>
      ) : null}
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {Object.entries(totals).map(([key, value]) => (
          <div key={key} className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
            <p className="text-sm text-zinc-400">{labels[key as ReactionKey]}</p>
            <p className="text-3xl font-black text-primary">{value}</p>
          </div>
        ))}
      </div>
    </Surface>
  );
}
