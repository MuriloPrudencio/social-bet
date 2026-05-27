"use client";

import { RankingPanel } from "@/components/organisms/ranking-panel";
import { useRanking } from "@/hooks/use-ranking";
import { useProfile } from "@/hooks/use-profile";

export function RankingView() {
  const ranking = useRanking(true);
  const profile = useProfile(true);

  return <RankingPanel ranking={ranking.data} privacy={profile.data?.privacy} full />;
}
