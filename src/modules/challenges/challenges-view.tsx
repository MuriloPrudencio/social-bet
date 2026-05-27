"use client";

import { ChallengesPanel } from "@/components/organisms/challenges-panel";
import { useChallenges } from "@/hooks/use-challenges";

export function ChallengesView() {
  const challenges = useChallenges(true);
  return <ChallengesPanel challenges={challenges.data} />;
}
