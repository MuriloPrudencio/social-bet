"use client";

import { buildTrendsFromFeed } from "@/components/organisms/right-rail";
import { ExploreCards } from "@/modules/explore/explore-cards";
import { useFeed } from "@/hooks/use-feed";
import { useRanking } from "@/hooks/use-ranking";
import { useChallenges } from "@/hooks/use-challenges";
import { useDiscovery } from "@/hooks/use-discovery";

export function ExploreView() {
  const feed = useFeed(true);
  const ranking = useRanking(true);
  const challenges = useChallenges(true);
  const discovery = useDiscovery(true);
  const trends = buildTrendsFromFeed(feed.data);

  return <ExploreCards ranking={ranking.data} challenges={challenges.data} trends={trends} discovery={discovery.data} />;
}
