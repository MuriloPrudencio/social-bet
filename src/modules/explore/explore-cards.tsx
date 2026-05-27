"use client";

import { Surface } from "@/components/atoms/surface";
import { buildExploreCards } from "@/modules/explore/explore.mapper";
import { FollowButton } from "@/components/molecules/follow-button";
import { Avatar } from "@/components/atoms/avatar";
import type { Trend } from "@/components/organisms/right-rail";
import type { Challenge, DiscoveryPayload, RankingUser } from "@/types/betsocial";

export function ExploreCards({
  ranking,
  challenges,
  trends,
  discovery
}: {
  ranking?: RankingUser[];
  challenges?: Challenge[];
  trends?: Trend[];
  discovery?: DiscoveryPayload;
}) {
  const cards = buildExploreCards({ ranking, challenges, trends });

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Surface key={card.title} className="premium-card p-5 transition hover:border-primary/30 hover:shadow-neon">
              <Icon className="mb-3 size-8 text-primary" />
              <h3 className="font-black">{card.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{card.text}</p>
            </Surface>
          );
        })}
      </div>
      {discovery ? (
        <div className="grid gap-4 xl:grid-cols-2">
          <DiscoveryList title="Trending players" users={discovery.trendingPlayers} />
          <DiscoveryList title="Suggested for you" users={discovery.suggestedForYou} />
          <DiscoveryList title="Rising players" users={discovery.risingPlayers} />
          <DiscoveryList title="Live activity" users={discovery.liveActivity} />
        </div>
      ) : null}
    </div>
  );
}

function DiscoveryList({ title, users = [] }: { title: string; users?: NonNullable<DiscoveryPayload[keyof DiscoveryPayload]> }) {
  return (
    <Surface className="p-4">
      <h3 className="mb-3 text-lg font-black">{title}</h3>
      <div className="space-y-2">
        {users.slice(0, 5).map((user) => (
          <div key={user.id} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <Avatar label={user.avatar} verified={user.verified} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{user.name}</p>
              <p className="truncate text-xs text-zinc-400">{user.reason ?? user.badge}</p>
            </div>
            <span className="hidden rounded-full bg-primary/10 px-2 py-1 text-xs font-black text-primary sm:inline">
              {user.trendingScore ?? user.recommendationScore ?? 0}
            </span>
            <FollowButton userId={user.id} isFollowing={user.isFollowing} compact />
          </div>
        ))}
      </div>
    </Surface>
  );
}
