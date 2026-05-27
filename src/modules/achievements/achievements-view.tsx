"use client";

import { Surface } from "@/components/atoms/surface";
import { buildAchievementCards } from "@/modules/achievements/achievements.mapper";
import { useProfile } from "@/hooks/use-profile";
import { useRanking } from "@/hooks/use-ranking";
import { useChallenges } from "@/hooks/use-challenges";
import { useFeed } from "@/hooks/use-feed";

export function AchievementsView() {
  const profile = useProfile(true);
  const ranking = useRanking(true);
  const challenges = useChallenges(true);
  const feed = useFeed(true);

  const cards = buildAchievementCards({
    profile: profile.data,
    ranking: ranking.data,
    challenges: challenges.data,
    feed: feed.data
  });

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Surface key={card.title} className="premium-card p-5">
            <Icon className={`mb-3 size-8 ${card.tone}`} />
            <h3 className="font-black">{card.title}</h3>
            <p className="mt-2 text-sm text-zinc-400">{card.description}</p>
          </Surface>
        );
      })}
    </div>
  );
}
