import { Activity, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Avatar } from "@/components/atoms/avatar";
import { ChallengesPanel } from "@/components/organisms/challenges-panel";
import { RankingPanel } from "@/components/organisms/ranking-panel";
import { Surface } from "@/components/atoms/surface";
import { SectionHeading } from "@/components/molecules/section-heading";
import type { Activity as ActivityType, Challenge, FeedPost, Profile, RankingUser } from "@/types/betsocial";

export type Trend = {
  game: string;
  bets: number;
  growth: number;
};

export function RightRail({
  ranking,
  challenges,
  activities,
  trends,
  hideRanking = false,
  hideChallenges = false
}: {
  ranking?: RankingUser[];
  challenges?: Challenge[];
  profile?: Profile;
  activities?: ActivityType[];
  trends?: Trend[];
  hideRanking?: boolean;
  hideChallenges?: boolean;
}) {
  return (
    <aside className="hidden w-[420px] shrink-0 space-y-4 2xl:block">
      {hideRanking ? null : <RankingPanel ranking={ranking} />}
      {hideChallenges ? null : <ChallengesPanel challenges={challenges} />}
      <Surface className="p-4">
        <SectionHeading title="Atividades recentes" action={<Link href="/notifications" className="hover:underline">Ver todas</Link>} />
        <div className="space-y-3">
          {(activities ?? []).map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <Avatar label={item.avatar} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{item.user}</p>
                <p className="truncate text-xs text-zinc-400">{item.text}</p>
              </div>
              <span className="text-xs text-zinc-500">{item.createdAt}</span>
            </div>
          ))}
        </div>
      </Surface>
      <Surface className="p-4">
        <SectionHeading title="Tendencias" />
        {(trends ?? []).map((trend) => (
          <div key={trend.game} className="mb-2 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-3">
            <Activity className="size-5 text-gold" />
            <div className="flex-1">
              <p className="text-sm font-bold">{trend.game}</p>
              <p className="text-xs text-zinc-400">{trend.bets.toLocaleString("pt-BR")} apostas</p>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-bold text-primary"><TrendingUp className="size-4" />{trend.growth}%</span>
          </div>
        ))}
      </Surface>
    </aside>
  );
}

export function buildTrendsFromFeed(posts: FeedPost[] = []): Trend[] {
  const trendsByGame = posts.reduce<Record<string, Trend>>((acc, post) => {
    const current = acc[post.game] ?? { game: post.game, bets: 0, growth: 0 };
    acc[post.game] = {
      ...current,
      bets: current.bets + Math.max(1200, Math.round(post.amount / 2)),
      growth: Math.max(current.growth, Math.min(48, Math.round(post.multiplier / 3) || 12))
    };
    return acc;
  }, {});

  return Object.values(trendsByGame)
    .sort((a, b) => b.bets - a.bets)
    .slice(0, 4);
}
